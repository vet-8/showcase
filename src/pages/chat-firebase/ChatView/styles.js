const styles = theme => ({

  content: {
    height: 'calc(100vh - 300px)',
    overflow: 'auto',
    marginTop: '20px',
    padding: '0px 25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '50px',
    left: '200px',
    width: 'calc(100% - 550px)',
    position: 'absolute'
  },

  userSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#FDCB5A',
    color: 'black',
    width: '300px',
    borderRadius: '10px'
  },

  friendSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#707BC4',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  chatHeader: {
    width: 'calc(100% - 630px)',
    height: '50px',
    backgroundColor: 'white',
    marginLeft: '301px',
    fontSize: '24px',
    textAlign: 'left',
    color: 'black',
    paddingTop: '10px',
    boxSizing: 'border-box',
    fontWeight: '700',
    borderBottom: '3px solid',
    position: 'relative',
    left: '250px'
  }

});

export default styles;