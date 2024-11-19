import _ from "lodash";
import Table from "cli-table";
import { createInterface } from "readline";

export default class ProbabilityTable {
  constructor(probabilities, diceNames, pageSize = 3) {
    this.probabilities = probabilities;
    this.diceNames = diceNames;
    this.pageSize = pageSize;
    this.currentPage = 0;
  }

  displayPage(pageNumber) {
    try {
      const start = pageNumber * this.pageSize;
      const end = start + this.pageSize;
      const pageData = this.probabilities.slice(start, end);

      const table = new Table({
        head: ["Victory Chance", ...this.diceNames],
        colWidths: Array(this.diceNames.length + 1).fill(12),
        colAligns: ["center", ...Array(this.diceNames.length).fill("center")],
        style: {
          head: ["cyan"],
          border: ["yellow"],
        },
      });

      pageData.forEach((row, index) => {
        const rowName = this.diceNames[start + index];
        const formattedRow = row.map((prob, i) =>
          i === start + index
            ? `${(prob * 100).toFixed(2)}%`
            : `${(prob * 100).toFixed(2)}%`
        );
        table.push([rowName, ...formattedRow]);
      });

      console.log(table.toString());
      console.log(
        `\nPage ${pageNumber + 1} of ${Math.ceil(
          this.probabilities.length / this.pageSize
        )}`
      );
    } catch (error) {
      console.error("Error displaying page:", error);
    }
  }

  nextPage() {
    try {
      if ((this.currentPage + 1) * this.pageSize < this.probabilities.length) {
        this.currentPage++;
        this.displayPage(this.currentPage);
      } else {
        console.log("No more pages.");
      }
    } catch (error) {
      console.error("Error moving to next page:", error);
    }
  }

  previousPage() {
    try {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.displayPage(this.currentPage);
      } else {
        console.log("You are already on the first page.");
      }
    } catch (error) {
      console.error("Error moving to previous page:", error);
    }
  }

  async displayAll() {
    try {
      const totalPages = Math.ceil(this.probabilities.length / this.pageSize);
      for (let i = 0; i < totalPages; i++) {
        await this.displayPage(i);
        if (i < totalPages) {
          await this.waitForEnter();
        }
      }
    } catch (error) {
      console.error("Error displaying all pages:", error);
    }
  }

  waitForEnter() {
    return new Promise((resolve) => {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("\n--- Press Enter to continue ---\n", () => {
        rl.close();
        resolve();
      });
    });
  }

  displayIntro() {
    try {
      console.log("Probability of winning for the user:");
      console.log(
        "This table shows the probability of winning for each combination of dice."
      );
    } catch (error) {
      console.error("Error displaying introduction:", error);
    }
  }
}
