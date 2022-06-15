export class BeregningsBoks {
  public id: string;
  public outputEl!: Element;

  constructor(
    public pos: { x: number, y: number },
    public backgroundColor: string,
    public name: string,
    inputs: number,
  ) {
    this.id = name;
    const template = `
    <div
      class="boks"
      id="${this.id}"
      style="background-color: ${backgroundColor}; top: ${pos.y}px; left: ${pos.x}px"
    >
      <p id="name">${name}</p>
      <form>
        ${generateInputTemplate(inputs)}
        <button type="submit">Beregn</button>
      </form>
      <p id="output"> </p>
    </div>
    `;

    const target = document.getElementById('target');
    if(!target) throw new Error('Can\'t find target node');

    target.innerHTML += template;

    // The elements are not yet in the DOM, so we need to get them again
    setTimeout(() => {
      const outputNode = document.querySelector(`#${this.id} > p#output`);
      if(!outputNode) throw new Error('Can\'t find output node');
  
      this.outputEl = outputNode;
  
      // Set the event listener
      const form: HTMLFormElement | null = document.querySelector(`#${this.id} > form`);
      if(!form) throw new Error('Can\'t find form');
      console.log(form);
      
      form.addEventListener('submit', this.onSubmit.bind(this));
    }, 10);
  }

  onSubmit(e: Event) {
    e.preventDefault();

    console.log(e);
    

    const inputs = document.querySelectorAll<HTMLInputElement>(`#${this.id} > form > input`);
    let sum = 0;

    inputs.forEach(inp => sum += Number(inp.value));

    const average = (sum / inputs.length);

    this.outputEl.innerHTML = `= ${average.toFixed(2)}`;
  }
}

function generateInputTemplate(n: number): string {
  const inputs: string[] = [];

  for(let i = 0; i < n; i++) {
    inputs.push('<input type="number">');
  }

  return inputs.join('');
}