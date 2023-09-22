import styled from "styled-components";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from "swr";
import React from "react";

const fetcher = async (url) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    console.log(error);
    throw error;
  }
  return res.json();
};

const URL = "https://swapi.dev/api/people/";

export default function HomePage() {
  const { data, isLoading, error } = useSWR(URL, fetcher);
  console.log(data);

  return (
    <Layout>
      <h1>React Data Fetching: Star Wars</h1>
      {isLoading && <p>isLoading...</p>}
      {error && (
        <>
          <span>{error.status}</span>
          <p>{error.message}</p>
        </>
      )}
      {data && (
        <List>
          {data.results.map((person, index) => (
            <React.Fragment key={person.name}>
              <li>
                <StyledLink href={`characters/${index + 1}`}>
                  {index < 9 ? `0${index + 1}` : `${index + 1}`} {person.name}
                </StyledLink>
              </li>
            </React.Fragment>
          ))}
        </List>
      )}
    </Layout>
  );
}

const List = styled.ul`
  background-color: var(--color-light);
  list-style-type: "➡️ ";
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-dark);
`;
