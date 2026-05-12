from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import generate_api_key
from app.models.user import User
from app.models.api_key import APIKey
from app.schemas.user import APIKeyCreate, APIKeyResponse, APIKeyCreated
from app.services.auth import get_current_user

router = APIRouter(prefix="/api-keys", tags=["api-keys"])

MAX_KEYS_PER_USER = 5


@router.get("", response_model=List[APIKeyResponse])
def list_api_keys(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(APIKey).filter(APIKey.user_id == current_user.id, APIKey.is_active == True).all()


@router.post("", response_model=APIKeyCreated, status_code=201)
def create_api_key(payload: APIKeyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    count = db.query(APIKey).filter(APIKey.user_id == current_user.id, APIKey.is_active == True).count()
    if count >= MAX_KEYS_PER_USER:
        raise HTTPException(status_code=400, detail=f"Maximum of {MAX_KEYS_PER_USER} API keys allowed")

    raw_key, key_hash = generate_api_key()
    api_key = APIKey(
        user_id=current_user.id,
        name=payload.name,
        key_hash=key_hash,
        key_prefix=raw_key[:10],
    )
    db.add(api_key)
    db.commit()
    db.refresh(api_key)

    return {**APIKeyResponse.model_validate(api_key).model_dump(), "key": raw_key}


@router.delete("/{key_id}", status_code=204)
def revoke_api_key(key_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    api_key = db.query(APIKey).filter(APIKey.id == key_id, APIKey.user_id == current_user.id).first()
    if not api_key:
        raise HTTPException(status_code=404, detail="API key not found")
    api_key.is_active = False
    db.commit()
