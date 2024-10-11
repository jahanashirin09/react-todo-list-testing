import { describe,expect,it } from "vitest";
import {render,screen} from '@testing-library/react'
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
describe("SignUp",()=>{
    it("sign up heading",()=>{
        render(
            <BrowserRouter>
            <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
               <SignUp/>
            </GoogleOAuthProvider>
           </BrowserRouter>
        )
        const signupHeading=screen.getByText('SignUp')
        expect(signupHeading).toBeInTheDocument
        expect(signupHeading)

    })
    it("sign up name checking",()=>{
        const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[0]).toBeInTheDocument()
    expect(loginlabel[0]).toHaveTextContent("Name")
    })
    it("sign up email checking",()=>{
        const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[1]).toBeInTheDocument()
    expect(loginlabel[1]).toHaveTextContent("Email")
    })
    it("sign up Password checking",()=>{
        const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[2]).toBeInTheDocument()
    expect(loginlabel[2]).toHaveTextContent("Password")
    })
    it("sign up Confirm Password checking",()=>{
        const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[3]).toBeInTheDocument()
    expect(loginlabel[3]).toHaveTextContent("Confirm Password")
    })
    
})