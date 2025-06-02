// unique namesoace for release system example:
const ReleaseSystem = {
  async fetchUserData() {
    // simulate API call with async/await (ES2017)
    const userData = await new Promise((resolve) =>
      setTimeout(() => resolve({ id: 1, name: 'bob', age: 25 }), 1000)
    );
    // destructuring (ES6) to extract properties
    const { name: userName, age: userAge } = userData;
    return { userName, userAge };
  },

  // display results in UI
  async display() {
    // getting the output div to work with
    const output = document.getElementById('output');

    // simulate loading of user data
    output.innerHTML = '<p>Loading user data...</p>';

    // fetch user data
    const { userName, userAge } = await this.fetchUserData();

    // display results
    output.innerHTML = `
    <p>ES6 Destructuring: Name = ${userName}</p>
    <p>ES2017 Async/Await: Age = ${userAge}</p>
    `;

    console.log('User:', { userName, userAge }); // for debugging
  },
};

// global function to trigger button onclick="runReleaseSystem()"
async function runReleaseSystem() {
  await ReleaseSystem.display();
}
