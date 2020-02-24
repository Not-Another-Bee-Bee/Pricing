import React from 'react';
import PropTypes from 'prop-types';
import { LineWrapper, Vdivider, SaleStatus, Zestimate } from './style.jsx'
import Popup from './ZestimatePopup.jsx';

class SummaryLine3 extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      resizeFlag: true,
      popup: false,
      popupLeft: '',
      popupTop: '',
      popupWidth: ''
    };

    // References
    this.zestRef = React.createRef();   // zestimate text
    this.popupRef = React.createRef();  // popup

    this.showPopupOnClick = this.showPopupOnClick.bind(this);
    this.hidePopupOnClick = this.hidePopupOnClick.bind(this);
  }

  // componentDidMount() {
  //   this.setState((state) => {


  //     state.popup = false;

  //     return state;
  //   });
  // }

  showPopupOnClick() {
    // show popup
    this.setState({popup: true}, () => {
      this.setState((state) => {
        // compute left and top value where the popup appear
        state.popupLeft = this.zestRef.current.offsetLeft + this.zestRef.current.offsetWidth + 15;
        state.popupTop = document.getElementsByClassName('summary')[0].offsetTop;
        // state.popupLeft = this.zestRef.current.offsetRight - 15

        // compute width of popup, so it does not go over on the right
        state.popupWidth = document.getElementsByClassName('summary')[0].offsetLeft + document.getElementsByClassName('summary')[0].clientWidth - 15 - state.popupLeft;

        // change to string
        state.popupLeft = state.popupLeft.toString() + 'px';
        state.popupTop = state.popupTop.toString() + 'px';
        state.popupWidth = state.popupWidth.toString() + 'px';

        return state;
      });
    });

    // make other parts of app to close popup when clicked;
    document.addEventListener('click', this.hidePopupOnClick, {once: true});
  }

  hidePopupOnClick(e) {
    if (e.target.classList[3] === "closeIcon") { // close button clicked
      this.setState({popup: false});
    } else if (document.getElementById('zestimatePopup').contains(e.target)) { // popup other than close button clicked
      // do not hide, but make app part clickable again
      document.addEventListener('click', this.hidePopupOnClick, {once: true});
    } else { // outside of popup clicked
      this.setState({popup: false});
    }
  }

  render() {
    let popup = this.state.popup ?
                <Popup popupLeft={this.state.popupLeft} popupTop={this.state.popupTop} popupWidth={this.state.popupWidth} hidePopupOnClick={this.hidePopupOnClick}/>
                : '';

    return (
      <LineWrapper id="summaryLine3" fontsize='13px' ref={this.props.sl3Ref}>
        <SaleStatus id="summary_salesStatus" status={this.props.saleStatus}><b>{this.props.saleStatus}</b></SaleStatus>
        <Vdivider/>
        <span id="summary_zestimate">
          <Zestimate ref={this.zestRef} onClick={this.showPopupOnClick}>
            Zestimate<sup>®</sup>:
          </Zestimate>
          &nbsp;$10,420
        </span>
        {popup}
      </LineWrapper>
    );
  }
}

SummaryLine3.propTypes = {
  saleStatus: PropTypes.string,
  zestimate: PropTypes.number,
  sl3Ref: PropTypes.object
}

export default SummaryLine3;
