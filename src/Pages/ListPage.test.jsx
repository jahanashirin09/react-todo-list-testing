import { describe,it ,expect} from "vitest";
import {render,screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import ListPage from "./ListPage";
describe("list page",()=>{
    it("heading check",()=>{
        render(
            <BrowserRouter>
            <ListPage/>
            </BrowserRouter>

        )
        const ListPageHeading=screen.getByText("My To Do List")
        expect(ListPageHeading).toBeInTheDocument()

    })
   
})


