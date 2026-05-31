from fastapi import APIRouter, Query, HTTPException
import services.dashboard_service as board

router = APIRouter()

@router.get("/api/v1/stats/globales")
def get_statistics():
    return board.get_statistics()

@router.get("/api/v1/stats/top-moyennes")
def get_bests():
    return board.get_best_ten()

@router.get("/api/v1/stats/classes")
def get_classe_aggreg():
    return board.classe_aggregation()