import React,{Fragment,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './index.css';
import App from './components/app';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store/index'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {routes} from './route/ContentRoutes'
import ConfigDB from './data/customizer/config'

const Root = (props) =>  {
  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation  || 'fade'
  const abortController = new AbortController();


useEffect(() => {
      setAnim(animation)
      console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
      console.disableYellowBox = true;      
      return function cleanup() {
        abortController.abort();
      }
   // eslint-disable-next-line
 }, []);

return(
    <Fragment>
      <Provider store={store}>
      <BrowserRouter basename={`/`}>
        <Switch>
          <Fragment>
          <App>
             {/* <Route exact path="/" render={() => {
                        return (<Redirect to={`${process.env.PUBLIC_URL}/starter-kit/default-page`} />)
                    }} />
              <TransitionGroup>
                      {routes.map(({ path, Component }) => (
                          <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition 
                                  in={match != null}
                                  timeout={500}
                                  classNames={anim} 
                                  unmountOnExit
                                  >
                                  <div><Component/></div>
                                </CSSTransition> 
                            )}
                          </Route>
                        ))}
              </TransitionGroup> */}
          </App>
          </Fragment> 
          :
          <Redirect to={`${process.env.PUBLIC_URL}/login`}/>
        
        </Switch>
      </BrowserRouter>
      </Provider>
  </Fragment>
)
}
ReactDOM.render(<Root/>,
  document.getElementById('root')
  );
serviceWorker.unregister();
