import MainPage from "../main";
import SettingsPage from "../settings";
import Page from "../../core/templates/page";
import StatisticPage from '../statistics/index';
import Header from "../../core/components/header";
import ErrorPage from "../error";
import { ErrorTypes } from "../error";

export const enum PageIds {
    MainPage = 'main-page',
    SettingsPage = 'settings-page',
    StatisticPage = 'statistic-page'
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId: string = 'current-page';
    private initialPage: MainPage;
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }

        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.SettingsPage) {
            page = new SettingsPage(idPage)
        } else if (idPage === PageIds.StatisticPage) {
            page = new StatisticPage(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash)
        })
    }

    constructor() {
        this.initialPage = new MainPage('settings-page');
        this.header = new Header('header', 'header-container');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('settings-page');
        this.enableRouteChange();

    }
}

export default App;