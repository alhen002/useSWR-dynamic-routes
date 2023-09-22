import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";

const URL = `https://swapi.dev/api/people/`;

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

export default function Character() {
  const router = useRouter();
  const { id } = router.query;

  const { data: person, isLoading, error } = useSWR(URL + id, fetcher);

  return (
    <Layout>
      {isLoading && <p style={{ color: "white" }}>isLoading...</p>}
      {error && (
        <>
          <small>{error.status}</small>
          <p>{error.info}</p>
        </>
      )}

      {person && (
        <Card
          id={id}
          name={person.name}
          height={person.height}
          eyeColor={person.eye_color}
          birthYear={person.birth_year}
        />
      )}
    </Layout>
  );
}
