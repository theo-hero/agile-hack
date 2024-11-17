// import { useEffect } from "react";
// import { SprintTypes } from "./SprintList";
// import axios from "axios";

function Home() {
  // useEffect(() => {
  //   const default_sprints: SprintTypes[] = [
  //     {
  //       sprint_name: "Спринт 2024.3.1.NPP Shared Sprint",
  //       sprint_status: "Закрыт",
  //       sprint_start_date: "2024-07-03T19:00:00.44622Z",
  //       sprint_end_date: "2024-07-16T19:00:00.44622Z",
  //       entity_ids: [4327584]
  //     },
  //     {
  //       sprint_name: "Спринт 2024.3.2.NPP Shared Sprint",
  //       sprint_status: "В процессе",
  //       sprint_start_date: "2024-08-03T19:00:00.44622Z",
  //       sprint_end_date: "2024-08-16T19:00:00.44622Z",
  //       entity_ids: [4327324, 679536]
  //     }
  //   ];

  //   const postSprints = async () => {
  //     for (const sprint of default_sprints) {
  //       try {
  //         const response = await axios.post('/sprint/add', sprint);
  //         console.log(response);
  //       } catch (error) {
  //         console.error('Error fetching sprints:', error);
  //       }
  //     }
  //   };

  //   postSprints();
  // }, [])

  return (
    <main>
      <h1>
        Стартовая страница
      </h1>
    </main>
  )
}

export default Home;