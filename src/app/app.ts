import { Component, signal } from '@angular/core';

interface Bird {
  name: string;
  origin: string;
  description: string;
  image: string;
}

// Hotlinked from Muppet Wiki, not hosted here. Fandom blocks foreign referers, hence referrerpolicy in app.html.
const wiki = (path: string) => `https://static.wikia.nocookie.net/muppet/images/${path}/revision/latest`;

const BIRDS: Bird[] = [
  { name: 'Big Bird', origin: 'Sesame Street · USA', image: wiki('1/15/Followthatbirdie84.jpg'),
    description: 'An 8\'2" canary with a heart even bigger than he is. Lives in a nest behind 123 Sesame Street.' },
  { name: 'Garibaldo', origin: 'Vila Sésamo · Brazil', image: wiki('1/15/Garibaldoblue.jpg'),
    description: 'Big Bird\'s blue-feathered Brazilian cousin. Curious, gentle, and endlessly asking "por quê?"' },
  { name: 'Abelardo Montoya', origin: 'Plaza Sésamo · Mexico', image: wiki('2/22/1Abelardo.jpg'),
    description: 'A green parrot cousin of Big Bird who loves dancing, singing, and telling tall tales.' },
  { name: 'Pino', origin: 'Sesamstraat · Netherlands', image: wiki('a/ab/Pino.jpg'),
    description: 'A blue bird from Amsterdam who is a little shy, a little clumsy, and always a good friend.' },
  { name: 'Poupas', origin: 'Rua Sésamo · Portugal', image: wiki('e/ee/RuaSesamo_POUPAS.jpg'),
    description: 'A big, cheerful orange bird who brought the sunshine of Sesame Street to Portugal.' },
  { name: 'Caponata', origin: 'Barrio Sésamo · Spain', image: wiki('5/5c/Caponata.jpg'),
    description: 'A tall, motherly hen with a flair for drama and a soft spot for every child on the street.' },
  { name: 'Little Bird', origin: 'Sesame Street · USA', image: wiki('6/64/Littlebird.jpg'),
    description: 'A tiny bird who is Big Bird\'s friend. Proof that great things come in small packages.' },
];

const pick = () => BIRDS[Math.floor(Math.random() * BIRDS.length)];

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly bird = signal(pick());
  protected readonly flipped = signal(false);
  protected readonly imgFailed = signal(false);
  protected readonly tilt = signal('');

  constructor() {
    setTimeout(() => this.flipped.set(true), 700); // let the deal-in land, then reveal
  }

  drawAgain() {
    this.flipped.set(false);
    setTimeout(() => {
      let next = pick();
      while (BIRDS.length > 1 && next === this.bird()) next = pick();
      this.bird.set(next);
      this.imgFailed.set(false);
      this.flipped.set(true);
    }, 600); // matches flip duration in app.css
  }

  onMove(e: PointerEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.tilt.set(`rotateX(${-y * 16}deg) rotateY(${x * 16}deg)`);
  }
}
