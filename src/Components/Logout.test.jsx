import { describe, expect, it } from 'vitest'; 
import { render, screen } from '@testing-library/react';
import Logout from './Logout';
import { BrowserRouter } from 'react-router-dom';

describe("Logout Component", () => {
  it("renders the button", () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("onclick function on logout button ",()=>{
  
  })
});
