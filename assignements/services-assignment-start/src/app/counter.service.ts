
export class CounterService {

  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  counter = 0;

  incActiveToInactive(): void {

    this.activeToInactiveCounter++;
    console.log("activeToInactiveCounter", this.activeToInactiveCounter);
  }

  incInactiveToActive(): void {

    this.inactiveToActiveCounter++;
    console.log("inactiveToActiveCounter", this.inactiveToActiveCounter);
  }

}