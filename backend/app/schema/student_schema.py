from pydantic import BaseModel
from typing import Literal
from datetime import date

class etudiant(BaseModel):
    code : str
    numero : str
    prenom : str
    nom : str
    dates : date
    classe : Literal["6e A", "6e B", "6e C", "6e D", "5e A", "5e B", "5e C", "5e D", "4e A", "4e B", "4e C", "4e D", "3e A", "3e B", "3e C", "3e D"]

     