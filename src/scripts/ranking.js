class Element {
    constructor(name, score, index) {
        this.name = name
        this.score = score
        this.index = index
    }

    html() {
        let element = document.createElement("p")
        
        element.classList = "p-2 bg-primary rounded-3"
        
        element.innerText = `${this.index === 0 ? "🥇 - " : this.index === 1 ? "🥈 - " : this.index === 2 ? "🥉 - " : `#${this.index + 1} - `}${this.name} : ${this.score}`
        return element
    }
}

async function getRanking(url) {
    let res = await fetch(url)
    let data = await res.json()

    data.sort((a, b) => b.score - a.score)
    
    data.forEach((x, i) => {
        let element = new Element(x.name, x.score, i)
        document.getElementById("ranking").appendChild(element.html())
    })

}

async function createUser(name, score) {
    const url = "https://my-api-self.vercel.app/users";
  
    const userData = {
      name: name,
      score: score
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error("Error al hacer la solicitud POST");
      }
  
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  
