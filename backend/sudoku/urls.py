from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signin/", views.signin_view, name="signin"),
    path("signup/", views.signup_view, name="signup"),
    path("board/", views.get_game_by_difficulty, name="board"),
    path("save/", views.save_game_state, name="save")
]
