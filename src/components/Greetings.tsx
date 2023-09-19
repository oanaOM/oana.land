import { useEffect, useState } from "react";

export function Greetings() {
  const [greeting, setGreeting] = useState("");

  const fetchGreeting = async () => {
    try {
      const response = await fetch("https://www.greetingsapi.com/random");
      const greetingData = await response.json();

      setGreeting(greetingData.greeting);
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          "Oops, something went wrong with the greetings API: ",
          error
        );
        setGreeting("Hello");
      }
    }
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  return <h1>{greeting}</h1>;
}
