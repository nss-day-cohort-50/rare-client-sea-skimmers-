import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { TagsProvider } from "./tags/TagProvider"
import { CategoryProvider } from "./categories/CatProvider"

export const Rare = () => (
    <>
        <TagsProvider>
        <CategoryProvider>
            <Route render={() => {
                if (localStorage.getItem("rare_user_token")) {
                    return <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />
        </CategoryProvider>
        </TagsProvider>
        
        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_user_token")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)
