import React from 'react';
import PropTypes from 'prop-types';
import SummaryLine1 from './SummaryLine1.jsx';
import SummaryLine3 from './SummaryLine3.jsx';
import SummaryButtons from './SummaryButtons.jsx';
import { SummaryWrapper, LineWrapper, DollarIconWrapper, PreQualLink } from './style.jsx'

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SummaryWrapper className="summary">
        <SummaryLine1 price={this.props.house.price} bd={this.props.house.beds} ba={this.props.house.baths} sqft={this.props.house.sqft}/>

        <LineWrapper id="summaryLine2" fontsize='14px' style={{fontWeight: 'bold'}}>
          <span id="summary_address">{this.props.house.address}</span>
        </LineWrapper>

        <SummaryLine3 sl3Ref={this.props.sl3Ref} saleStatus={this.props.house.status} zestimate={this.props.house.zestimate} />

        <LineWrapper id="summaryLine4" fontsize='14px' style={{position: 'relative', top: '-10px'}}>
          <span id="summary_estPayment"><b>Est. payment</b>: ${this.props.house.estPayment}/mo</span>
          <PreQualLink href="https://www.zillow.com/pre-qualify/#/first-time">
            <DollarIconWrapper><i className="material-icons">monetization_on</i></DollarIconWrapper>
            Get pre-qualified
          </PreQualLink>
        </LineWrapper>

        <SummaryButtons tourButton={this.props.house.tour_active}/>
      </SummaryWrapper>
    );
  }
}

Summary.propTypes = {
  house: PropTypes.object,
  sl3Ref: PropTypes.object,
}

export default Summary;
