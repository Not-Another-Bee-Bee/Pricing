import React from 'react';
import PropTypes from 'prop-types';
import { DP } from './style.jsx'

// this react element is merely to provide panel in which user can scroll up and down
// the position within this panel is referenced in other modules

const DetailPanel = React.forwardRef(
  function dp({ twoActionsOnScroll }, ref) {
    return (
      <DP id="detailpanel" ref={ref} onScroll={twoActionsOnScroll}>
        <div className="ov">
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/2.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/3.png" width="100%"/> */}
        </div>
        <div className="ff">
          <h2 style={{paddingLeft: '10px'}}>Facts and features</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/4.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/5.png" width="100%"/> */}
        </div>
        <div className="hv">
          <h3>Jialu's Module</h3>
        </div>
        <div className="pth">
          <h2 style={{paddingLeft: '10px'}}>Price and tax history</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/6.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/7.png" width="100%"/> */}
        </div>
        <div className="mc">
          <h2 style={{paddingLeft: '10px'}}>Monthly Cost</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/8.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/9.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/10.png" width="100%"/> */}
        </div>
        <div className="rv">
          <h2 style={{paddingLeft: '10px', paddingBottom: '25px', borderBottom: '1px solid #DCDCDC'}}>Rental Value</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/11.png" width="100%"/> */}
        </div>
        <div className="ns">
          <h2 style={{paddingLeft: '10px'}}>Nearby Schools</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/12.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/13.png" width="100%"/> */}
        </div>
        <div className="ct">
          <h2 style={{paddingLeft: '10px'}}>Commute Time</h2>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/14.png" width="100%"/> */}
        </div>
        <div className="nh">
          <h3>Shreeya's Module</h3>
        </div>
        <div className="hfy">
          <h3 style={{paddingLeft: '10px'}}>Homes for you</h3>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/15.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/16.png" width="100%"/> */}
        </div>
        <div className="sh">
          <h3 style={{paddingLeft: '10px'}}>Similar Homes</h3>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/17.png" width="100%"/> */}
        </div>
        <div className="lpb">
          <h3 style={{paddingLeft: '10px'}}>Listing provided by</h3>
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/18.png" width="100%"/> */}
        </div>
        <div >
          {/* <img src="https://zillowclone.s3-us-west-1.amazonaws.com/19.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/20.png" width="100%"/>
          <img src="https://zillowclone.s3-us-west-1.amazonaws.com/21.png" width="100%"/> */}
        </div>
      </DP>
    );
  }
)

DetailPanel.propTypes = {
  twoActionsOnScroll: PropTypes.func
}

export default DetailPanel;
