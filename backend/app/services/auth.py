from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.database import get_db
from app.core.security import verify_password, decode_access_token, hash_api_key
from app.models.user import User
from app.models.api_key import APIKey
from sqlalchemy.sql import func

bearer_scheme = HTTPBearer(auto_error=False)


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    token = credentials.credentials

    # Try JWT first
    payload = decode_access_token(token)
    if payload:
        user_id = payload.get("sub")
        if user_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user and user.is_active:
                return user

    # Try API key
    key_hash = hash_api_key(token)
    api_key = db.query(APIKey).filter(APIKey.key_hash == key_hash, APIKey.is_active == True).first()
    if api_key:
        api_key.last_used_at = func.now()
        db.commit()
        user = db.query(User).filter(User.id == api_key.user_id).first()
        if user and user.is_active:
            return user

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
