from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
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
    warnings = relationship("Warning")
    medicine_ingredients = relationship("MedicineIngredient")


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


class Warning(Base):
    __tablename__ = "warning"

    id = Column(Integer, primary_key=True)
    medicine_id = Column(Integer, ForeignKey("medicine.id"))
    warning_text = Column(Text, nullable=False)


class AdminUser(Base):
    __tablename__ = "admin_user"

    id = Column(Integer, primary_key=True)
    email = Column(String(150), nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False)