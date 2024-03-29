class RankingElement {
    constructor(name, score, index) {
        this.name = name
        this.score = score
        this.index = index
    }

    html() {
        let rankingElement = document.createElement("p")
        
        rankingElement.classList = "p-2 bg-primary rounded-3"
        
        rankingElement.innerText = `${this.index === 0 ? "🥇 - " : this.index === 1 ? "🥈 - " : this.index === 2 ? "🥉 - " : `#${this.index + 1} - `}${this.name} : ${this.score}`
        return rankingElement
    }
}

async function getRanking(url) {
    let res = await fetch(url)
    let data = await res.json()

    data.sort((a, b) => b.score - a.score)
    
    data.forEach((x, i) => {
        let rankingElement = new RankingElement(x.name, x.score, i)
        document.getElementById("ranking").appendChild(rankingElement.html())
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
      return data
    } catch (error) {
      console.log(error);
    }
  }
  
