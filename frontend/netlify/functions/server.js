exports.handler = async () => {
  const projects = [
    {
      id: 1,
      name: "Chebucto Community Net Society",
      author: "Phillip Eliat-Cipaianu",
      languages: ["JavaScript", "React", "CSS"],
      description: "Chebucto Community Net is a volunteer organization which strives to enable all people in the Greater Halifax Region to participate in an electronic public space. Our mission is to assist our users and provide a platform for them to gather and share information and to participate in exchanges and dialogue that enrich their lives and their community. One of the many services we offer is internet for low-income individuals."
    },
    {
      id: 2,
      name: "Online Barter Trading Application",
      author: "Phillip Eliat-Cipaianu, Alex Prokhovtylo, Mateo Neira",
      languages: ["JavaScript", "Express", "OpenWeather API"],
      description: "Developed an innovative local barter trading app that enables users to seamlessly exchange goods and services by integrating Google Play Services for location tracking and real-time messaging, while managing data efficiently with Firebase Realtime Database and push notifications to keep users informed about new messages and offers."
    }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(projects),
    headers: { "Content-Type": "application/json" }
  };
};