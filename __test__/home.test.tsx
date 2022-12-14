import Home from "../pages/index";
import { render, setupUserEvent } from "../utils/tests";
import { postsData } from "../data";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import axios from "axios";

describe("User", () => {
  it("can see posts when they open the application", async () => {
    // Set a custom reponse for our request
    (axios.get as jest.Mock).mockResolvedValue({ data: postsData });

    // Render a component (Since user would not be executing any actio, we don't need to setup events)
    render(<Home />);

    // Assert that user can see Post Feed heading
    expect(screen.getByText("Post Feed")).toBeInTheDocument();

    // Assert that user can see an input
    expect(screen.getByRole("textbox", { name: /post/ })).toBeInTheDocument();

    // Assert that loading text is on the screen
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for loading text to be removed off the screen (i.e when our async called completes)
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // Assert that a network request was made which was called once and with a certain url
    expect(axios.get).toBeCalledTimes(1);

    // Assert that user can see 10 posts by default on the users screen
    const posts = screen.getAllByRole("article");
    expect(posts).toHaveLength(10);
  });

  it("can create post successfully", async () => {
    const { user } = setupUserEvent(<Home />);

    //Get input field
    const inputField = screen.getByRole("textbox");

    //Type inside input
    await user.type(inputField, "I am updating the field");

    //Get submit button
    const btnSubmit = screen.getByRole("button", { name: "Post" });

    //click submit button
    await user.click(btnSubmit);

    expect(axios.post).toBeCalledTimes(1);

    //Assert that user can now see 11 posts by default on the users screen
    const posts = screen.getAllByRole("article");
    expect(posts).toHaveLength(11);
  });
});
