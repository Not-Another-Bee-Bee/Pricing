// npm packages
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
// module: children react components
import Summary from "./Summary.jsx";
import NavigationBar from "./NavigationBar.jsx";
import DetailPanel from "./DetailPanel.jsx";
// module: styled-components
import { StyledApp } from "./style.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resizeFlag: true,
      house: {
        // initial house data
        pid: -1,
        price: 0,
        beds: 0,
        baths: 0,
        sqft: 0,
        address: "44 Tehama St",
        zip: "94103",
        city: "San Francisco",
        state: "CA",
        status: "For sale",
        tour_active: true,
        zestimate: 0,
        estPayment: 0
      },
      showArrow: { left: false, right: true }, // state used for navigation bar arrow button rendering
      onView: "ov" // state used for navigation bar rendering, which one to undline
    };

    // React Refs
    this.sl3Ref = React.createRef(); // summary line 3
    this.navbarRef = React.createRef(); // navigation bar
    this.dpRef = React.createRef(); // detail panel

    // Variable
    this.sl3Height = 0; // max height of summary line 3
    this.dpHeight = innerHeight - 45 - 189 - 45 - 20; // min height of detail panel

    // bind functions
    this.scrollOnClick = this.scrollOnClick.bind(this);
    this.slideOnClick = this.slideOnClick.bind(this);
    this.showHideOnSlide = this.showHideOnSlide.bind(this);
    this.twoActionsOnScroll = this.twoActionsOnScroll.bind(this);
    this.slideOnScroll = this.slideOnScroll.bind(this);
    this.renderOnScroll = this.renderOnScroll.bind(this);
  }

  componentDidMount() {
    // save the max height value of summary line 3 and detail panel
    this.sl3Height = this.sl3Ref.current.scrollHeight;

    // set the size of detail panel
    this.dpRef.current.style.height = `${this.dpHeight}px`;

    // get data from database
    this.requestDatafromDB();

    window.addEventListener("resize", () => {
      this.setState({ resizeFlag: !this.state.resizeFlag });
    });
  }

  requestDatafromDB() {
    // const id = window.location.href.match(/\d+$/) | 1; // get id value from the link
    // if does not exist, get the data with id=1
    const id = Math.floor(Math.random() * 100000)
    axios.get(`/api/v1/properties/${id}`)
      .then(res => {
        this.setState({
          house: res.data[0]
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  /*
    START: Event Listners

    slide implies horizontal scroll within navigation bar
    scroll implies vertical scroll within detail panel
  */
  scrollOnClick(e) {
    // to scroll up and down through detail panel when navigation bar is clicked
    // get classname of clicked one
    const clicked = e.target.classList[2];
    // find element in display panel with the same class name
    const elmtInDp = this.dpRef.current.getElementsByClassName(clicked)[0];

    // compute how much needed to be scrolled down within the panel
    const scrollAmount = elmtInDp.offsetTop - this.dpRef.current.offsetTop;
    this.dpRef.current.scrollTop = scrollAmount; // scroll down the panel

    // scrollIntoView does not work for some reason
    // $(`div.${clicked}`)[0].scrollIntoView();
  }

  slideOnClick(e) {
    // to slide navigation bar when arrow on navigation bar is clicked
    const clicked = e.target.id; // get which arrow is clicked
    const scrollAmount = clicked.startsWith("l") ? -250 : 250; // decide to slide left or right
    this.navbarRef.current.scrollLeft += scrollAmount; // scroll
  }

  showHideOnSlide() {
    // to show and hide arrows when slide through navigation bar
    this.setState(state => {
      const navbar = this.navbarRef.current;
      // left arrow
      state.showArrow.left =
        navbar.scrollLeft > navbar.firstChild.clientWidth / 5;
      // right arrow
      const maxScroll = navbar.scrollWidth - navbar.clientWidth;

      state.showArrow.right =
        navbar.scrollLeft < maxScroll - navbar.lastChild.clientWidth / 5;

      return state;
    });
  }

  twoActionsOnScroll(e) {
    this.slideOnScroll(e);
    this.renderOnScroll(e);
  }

  slideOnScroll(e) {
    //to slide navigation bar when user scroll through the detail panel
    // set react refs as variable
    const navbar = this.navbarRef.current;
    const dp = this.dpRef.current;

    // get pixel distance from the top of the page
    const offsetTopValue = e.target.scrollTop + dp.offsetTop;

    for (let i = 1; i < navbar.children.length + 1; i += 1) {
      if (i === navbar.children.length) {
        // handle case when the detail panel shows the last component 'similar homes'
        // in case of components after it is too small to handle offset comparison correctly
        // scroll
        navbar.lastChild.scrollIntoView();

        // chnage rendering of navigation bar
        this.setState({ onView: dp.children[i - 1].classList[0] });
      } else {
        // handle when the detail panel shows the other components
        if (offsetTopValue < dp.children[i].offsetTop) {
          // find where panel is at
          // scroll to the correct title in navigation bar
          navbar.children[i - 1].scrollIntoView();

          // chnage rendering of navigation bar
          this.setState({ onView: dp.children[i - 1].classList[0] });

          break;
        }
      }
    }
  }

  renderOnScroll(e) {
    // to change rendering of summary line 3
    // get values need for dynamic reandering
    const standard = this.dpRef.current.firstChild.clientHeight * 0.6;
    const where = e.target.scrollTop;

    // compute proportion
    const p = where < standard ? where / standard : 1;

    // where = scrollTop at 0 => full height & 0 opacity
    // where = scrollTop at standard or more => 0 height & 1 opacity
    this.sl3Ref.current.style.height = `${this.sl3Height * (1 - p)}px`;
    this.sl3Ref.current.style.opacity = 1 - p;

    // resize detail panel
    this.dpRef.current.style.height = `${this.dpHeight + this.sl3Height * p}px`;
  }
  /*
    END: Define Event Listner
  */

  render() {
    return (
      <StyledApp>
        {/* <img
          src="https://photos.zillowstatic.com/cc_ft_1536/ISbxvvi2nhu9ab0000000000.webp"
          width="100%"
          height="45"
        /> */}
        <Summary house={this.state.house} sl3Ref={this.sl3Ref} />
        <NavigationBar
          ref={this.navbarRef}
          onView={this.state.onView}
          showArrow={this.state.showArrow}
          scrollOnClick={this.scrollOnClick}
          slideOnClick={this.slideOnClick}
          showHideOnSlide={this.showHideOnSlide}
        />
        <DetailPanel
          ref={this.dpRef}
          twoActionsOnScroll={this.twoActionsOnScroll}
        />
      </StyledApp>
    );
  }
}

App.propTypes = {
  id: PropTypes.number
};

export default App;
