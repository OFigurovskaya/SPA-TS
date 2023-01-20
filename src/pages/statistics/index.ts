import Page from "../../core/templates/page";

class StatisticPage extends Page {
    static TextObject = {
        MainTitle: "StatisticPage",
    }
    constructor(id: string) {
        super(id);
    }
    render() {
        const title = this.createHeaderTitle(StatisticPage.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default StatisticPage;