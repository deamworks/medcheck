from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from database import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name_th = Column(String(150), nullable=False)


class Medicine(Base):
    __tablename__ = "medicine"

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("category.id"))
    name_th = Column(String(150), nullable=False)
    dosage_form = Column(String(50), nullable=False)
    indications = Column(Text, nullable=False)
    dosage_instructions = Column(Text, nullable=False)

    category = relationship("Category")
    brands = relationship("Brand")
    warnings = relationship("Warning", cascade="all, delete-orphan", order_by="Warning.id")
    medicine_ingredients = relationship("MedicineIngredient", cascade="all, delete-orphan")


class Brand(Base):
    __tablename__ = "brand"

    id = Column(Integer, primary_key=True)
    medicine_id = Column(Integer, ForeignKey("medicine.id"))
    brand_name = Column(String(255), nullable=False)
    licensee = Column(String(255), nullable=False)
    reg_no = Column(String(50), nullable=False, unique=True)
    legal_type = Column(String(50), nullable=False)


class MedicineIngredient(Base):
    __tablename__ = "medicine_ingredient"

    medicine_id = Column(Integer, ForeignKey("medicine.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("active_ingredient.id"), primary_key=True)

    ingredient = relationship("ActiveIngredient")


class ActiveIngredient(Base):
    __tablename__ = "active_ingredient"

    id = Column(Integer, primary_key=True)
    name_en = Column(String(150), nullable=False)
    name_th = Column(String(150), nullable=False)

    aliases = relationship("IngredientAlias", cascade="all, delete-orphan")


class Warning(Base):
    __tablename__ = "warning"

    id = Column(Integer, primary_key=True)
    medicine_id = Column(Integer, ForeignKey("medicine.id"))
    warning_text = Column(Text, nullable=False)


class IngredientAlias(Base):
    __tablename__ = "ingredient_alias"

    id = Column(Integer, primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("active_ingredient.id"), nullable=False)
    alias_name = Column(String(150), nullable=False)


class AdminUser(Base):
    __tablename__ = "admin_user"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())