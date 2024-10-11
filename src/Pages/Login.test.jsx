import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('Login Page', () => {
  it('displays the login heading', () => {
    render(
        <BrowserRouter>
         <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
            <Login/>
         </GoogleOAuthProvider>
        </BrowserRouter>
    );
    const LoginHeader=screen.getByTestId("LoginHeader")
    expect(LoginHeader).toBeInTheDocument();
    expect( LoginHeader).toHaveTextContent("Login")
  });
  it('display the label email',()=>{
    const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[0]).toBeInTheDocument()
    expect(loginlabel[0]).toHaveTextContent("Email")
  })
  it('display the label password',()=>{
    const loginlabel=screen.getAllByRole("label")
    expect(loginlabel[1]).toHaveTextContent("Password")
    
  })

});
