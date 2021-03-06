import styled from 'styled-components'


const Atom = styled.div`
width: 366px;
height: 366px;
margin: auto;
position: relative;
@keyframes hero-logo-circle {
  100% {
    transform: rotate(1turn);
  }
}
.hero-logo-circle {
  position: absolute;
  left: 0;
  top: 0;
  animation: hero-logo-circle 1s linear infinite;
  will-change: transform;
}
.hero-logo-circle:nth-child(1) {
  animation-duration: 30s;
}
.hero-logo-circle:nth-child(2) {
  animation-duration: 40s;
}
.hero-logo-circle:nth-child(3) {
  animation-duration: 50s;
}
.hero-logo-circle:nth-child(4) {
  animation-duration: 60s;
}
.hero-logo-circle:nth-child(5) {
  animation-duration: 70s;
}
.hero-logo-circle:nth-child(6) {
  animation-duration: 80s;
}
.hero-logo-circle:nth-child(7) {
  animation-duration: 90s;
}
.hero-logo-circle:nth-child(8) {
  animation-duration: 100s;
}
.hero-logo-circle:nth-child(9) {
  animation-duration: 110s;
}
.hero-logo-circle:nth-child(10) {
  animation-duration: 120s;
}
`

export default props => (
  <Atom>
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-red-semi-5aec49dbe5d420f928cece7001b96267ee17a9d3577374b68b4fba47c547bd75.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-red-2f7737b286dff1537adff47b8201aa43e33cbe1e47bd528ca2189809917fe132.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-orange-semi-d9d13d5529ae8f3c91dc80b182cf14fc629118bbdac8851b36e102dd15652557.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-orange-235189ed438049f084ca873f6ed2055c4127ddef84a55fa464053f34c10157e6.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-yellow-semi-af7a94ccf4768a81e6692d808f00e33ac88d9110f842d02c5ab211577686301a.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-yellow-bf8ec5927e343b3a804448d37a799c9c346af320f30b3cdc019297938fe00300.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-green-semi-6b12059c6aea11bf60e8f3c89afdffb6b817913541a1ce72cbca29f733224984.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-green-8a75a5e7cc4f8426a47f5ebfe2459283d3554cfdcf8dc5f492fda0b26d2d6d79.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-blue-semi-930c6662236ab84933e73083bc057b869b895bd36cef9e3e5254018fb61bc82a.svg" />
    <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-blue-50996d0762fb6d9ee13d6a52404dd01327fc542cc729777d532c9b633103c835.svg" />
  </Atom>
)