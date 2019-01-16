webpackHotUpdate(0,{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_routes__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_client_components_shared_Header__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_client_components_shared_Feedback__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_client_components_shared_ErrorHandler__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_client_components_shared_Loader__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_client_lib_LocalStorage__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_eventbusjs__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_eventbusjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_eventbusjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_global_scss__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_global_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__style_global_scss__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










class App extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super();
        // Todo: load current theme from cookie/user
        this.state = {
            theme: 'dark'
        };
        // on App start, ask backend for latest user info:
        this.bindEvents();
    }
    bindEvents() {
        const self = this;
        __WEBPACK_IMPORTED_MODULE_8_eventbusjs___default.a.addEventListener('APP_NEEDS_LOGIN', () => {
            console.log("APP_NEEDS_LOGIN");
            __WEBPACK_IMPORTED_MODULE_7_client_lib_LocalStorage__["a" /* default */].set('currentUser', null);
            self.goToSignIn();
        });
        __WEBPACK_IMPORTED_MODULE_8_eventbusjs___default.a.addEventListener('USER_LOGGED_IN', () => {
            console.log("USER_LOGGED_IN");
            self.setState({
                currentUser: __WEBPACK_IMPORTED_MODULE_7_client_lib_LocalStorage__["a" /* default */].get('currentUser')
            });
        });
        __WEBPACK_IMPORTED_MODULE_8_eventbusjs___default.a.addEventListener('USER_LOGGED_OUT', () => {
            console.log("USER_LOGGED_OUT");
            __WEBPACK_IMPORTED_MODULE_7_client_lib_LocalStorage__["a" /* default */].set('currentUser', null);
            self.goToSignIn();
        });
    }
    // Todo: horrible hack, we should create another component wrapper (withRouter) 
    // to handle this logic and all rendering below
    isSignInPage() {
        window.location.href.indexOf('signin') > -1;
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            //this.loadLatestUser();
        });
    }
    loadLatestUser() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            if (!this.state.currentUser) {
                let userRes = await Auth.tryLoadUser();
                console.log("LOADING USER", userRes);
                
                if (userRes) {
                    // okay, we found a valid user
                    this.setState({
                        currentUser: LocalStorage.get('currentUser')
                    })
                } else {
                    // redirect to signin?
                }
            } */
        });
    }
    goToSignIn() {
        this.props.history.push('/signin');
    }
    onChangeTheme(theme) {
        this.setState({
            theme: theme
        });
    }
    render() {
        const self = this;
        // todo: whackish for now
        let isSignInPage = window.location.href.indexOf('signin') > -1;
        // injects router/location into Header
        const HeaderComponent = Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(props => __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_client_components_shared_Header__["a" /* default */], Object.assign({}, props)));
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "app-container", className: 'app-container ' + this.state.theme },
                (this.state.currentUser || isSignInPage) &&
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "app-view", id: "app-view" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](HeaderComponent, null),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__config_routes__["a" /* default */], null),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4_client_components_shared_Feedback__["a" /* default */], null),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "view-fade" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5_client_components_shared_ErrorHandler__["a" /* default */], null)),
                (!this.state.currentUser && !isSignInPage) &&
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "app-view unloaded", id: "app-view" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](HeaderComponent, null),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "view loaded" },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "loader" },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6_client_components_shared_Loader__["a" /* default */], { size: "xl" }))),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5_client_components_shared_ErrorHandler__["a" /* default */], null)))));
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = App;



/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_hot_loader_patch__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_hot_loader_patch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_hot_loader_patch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_client_components_App__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__(55);






//import '../../globals'; // global function definitions
const AppWithRouter = Object(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["f" /* withRouter */])(props => __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4_client_components_App__["default"], Object.assign({}, props)));
__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__["AppContainer"], null,
    __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["a" /* BrowserRouter */], null,
        __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](AppWithRouter, null))), document.getElementById('root'));
// Hot Module Replacement API 
// Note: React Router v4 will throw an error saying you can't replace routes or history on the Router object
// This is unavoidable for now.
if (true) {
    module.hot.accept(150, () => {
        //const App = require('./components/App');
        __WEBPACK_IMPORTED_MODULE_2_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__["AppContainer"], null,
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["a" /* BrowserRouter */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](AppWithRouter, null))), document.getElementById('root'));
    });
}


/***/ }),

/***/ 57:
false

})