import * as React from "react";
import {render} from "react-dom";
import * as classnames from "classnames";

import {Tour, TourProvider, ModalStep, Step} from "../lib";
import {TooltipStep} from '../lib/tooltipStep/TooltipStep';

const styles = require("./app.less");

const reactContainer = document.createElement('div');
document.body.appendChild(reactContainer);

const CustomStep = ({onNext, onPrev, onClose}) => (
  <div style={{border: "2px solid red", padding: 10}}>
    <h1> custom markup </h1>
    <button onClick={onPrev}>prev</button>
    <button onClick={onNext}>next</button>
    <span onClick={onClose}> X </span>
  </div>
);

const defaultContent = (
  <div>
    <span>
      Все новые требования будут появляться на&nbsp;вкладке «в&nbsp;работе»
      в&nbsp;таблице сверху. Записывайте в&nbsp;таблицу номер документа
      и&nbsp;имя, ответственного. Это поможет отслеживать, какое требование
      в&nbsp;работе и&nbsp;кто им занимается.
    </span>
  </div>
);

const customHighlight = <div style={{border: "3px solid #ff8000"}}/>;

const highlightTarget = () => document.getElementById("some id");
const tooltipTarget1 = () => document.getElementById("some id-1-4");
const tooltipTarget2 = () => document.getElementById("some id-1-5");
const element2 = () => document.getElementById("some id2");
const element3 = () => document.getElementById("some id3");

const demo1 = () => document.querySelector("[data-tour-id=demo1]");
const demo2 = () => document.querySelector("[data-tour-id=demo2]");
const demo3 = () => document.querySelector("[data-tour-id=demo3]");

class App extends React.Component<{}, {}> {
  state = {
    demo2isShown: false,
    demo3isShown: false
  };

  render() {
    const demo2Class = classnames(styles.demo2, {
      [styles.shown]: this.state.demo2isShown
    });
    const demo3Class = classnames(styles.demo3, {
      [styles.shown]: this.state.demo3isShown
    });
    return (
      <TourProvider
        predicate={(id) => true}
        onTourShown={(id) => console.log(`shown tour ${id}`)}
      >
        <div className={styles.container}>
          <div className={styles.demo1} data-tour-id="demo1">
            Hi, there!
          </div>
          <div className={demo2Class} data-tour-id="demo2">
            Hi, there!
          </div>
          <div className={demo3Class} data-tour-id="demo3">
            Hi, there!
          </div>
          <Tour id="id1">
            <ModalStep
              header="Это приветственный шаг первого тура"
              content="А это текст для приветственного шага"
              onBefore={() => new Promise((res) =>
                setTimeout(res, 500)
              )}
              onAfter={() => new Promise((res) => res())}
              onOpen={() => console.log('Это приветственный шаг, onOpen')}
            />
            <TooltipStep
              target={demo1}
              positions={["right top"]}
              highlight={customHighlight}
              header="Это второй шаг"
              content={defaultContent}
              offset={30}
            />
            <TooltipStep
              target={demo2}
              positions={["left middle"]}
              header="Это третий шаг"
              content={defaultContent}
              highlight={customHighlight}
              offset={30}
              pinOptions={{hasPin: false}}
              onBefore={() => new Promise((res) => {
                this.setState({demo2isShown: true});
                setTimeout(res, 500);
              })}
              onAfter={() => new Promise((res) =>
                this.setState({demo2isShown: false}, res)
              )}
            />
            <TooltipStep
              isFallback
              target={demo3}
              positions={["right bottom"]}
              header="И последний шаг"
              content={defaultContent}
              highlight={customHighlight}
              onBefore={() => new Promise((res) => {
                this.setState({demo3isShown: true});
                setTimeout(res, 500);
              })}
              onAfter={() => new Promise((res) =>
                this.setState({demo3isShown: false}, res)
              )}
              offset={30}
            />
          </Tour>

          <Tour id="id2">
            <ModalStep
              header="Это приветственный шаг второго тура"
              content="А это текст для приветственного шага"
            />
            <TooltipStep
              target={demo2}
              positions={["left middle"]}
              header="Это второй шаг"
              content={defaultContent}
              highlight={customHighlight}
              offset={30}
              onOpen={() => console.log('Это второй шаг, onOpen')}
              group='group1'
              onBefore={() => new Promise((res) => {
                console.log('Это второй шаг, onBefore');
                this.setState({demo2isShown: true});
                setTimeout(res, 500);
              })}
              onAfter={() => new Promise((res) => {
                console.log('Это второй шаг, onAfter');
                this.setState({demo2isShown: false}, res)
              })}
            />
            <TooltipStep
              target={demo2}
              positions={["left middle"]}
              header="Третий шаг"
              content={defaultContent}
              highlight={customHighlight}
              group='group1'
              offset={30}
              onBefore={() => new Promise((res) => {
                console.log('Это третий шаг, onBefore');
                this.setState({demo2isShown: true});
                setTimeout(res, 500);
              })}
              onAfter={() => new Promise((res) => {
                console.log('Это третий шаг, onAfter');
                this.setState({demo2isShown: false}, res)
              })}
            />
            <TooltipStep
              target={demo3}
              positions={["right bottom"]}
              header="И последний шаг"
              content={defaultContent}
              highlight={customHighlight}
              offset={30}
              onBefore={() => new Promise((res) => {
                this.setState({demo3isShown: true});
                setTimeout(res, 500);
              })}
              onAfter={() => new Promise((res) =>
                this.setState({demo3isShown: false}, res)
              )}
            />
          </Tour>
        </div>
      </TourProvider>
    );
  }
}

render(<App/>, reactContainer);
