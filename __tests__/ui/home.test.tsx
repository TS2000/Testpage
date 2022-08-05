import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ItemsQuery } from "../../components/mutations/mutations";
import { aws4 } from "mongodb/src/deps";

const mocks: readonly MockedResponse<Record<string, any>>[] | undefined = [
  {
    request: {
      query: ItemsQuery,
    },
    result: {
      data: {
        items: [
          { id: "1", name: "Äpfel", picked: false },
          { id: "2", name: "Bananen", picked: false },
          { id: "3", name: "Joghurt", picked: false },
        ],
      },
    },
  },
];

test("Has correct headline", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home shoppingItems={[]} />
    </MockedProvider>
  );

  const heading = screen.getByRole("heading", {
    name: "Shopping List",
  });

  expect(heading).toBeInTheDocument();
});

test("Shows items", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home shoppingItems={[]}></Home>
    </MockedProvider>
  );

  const item1 = await screen.findByText("Äpfel");

  expect(item1).toBeInTheDocument();
});
