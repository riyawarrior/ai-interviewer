export const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/firstproject-cecaa/us-central1/question"
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      console.log('data:',data);
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
      throw err;
    }
  };
  