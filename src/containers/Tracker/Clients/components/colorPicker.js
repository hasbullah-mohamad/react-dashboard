import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: (this.props.color && JSON.parse(this.props.color)) || {
      r: '0',
      g: '0',
      b: '0',
      a: '1',
    },
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = (color) => {
    console.log(color)
    this.setState({ color: color.rgb })
    this.props.onChange({
      target: {
        type: 'color',
        name: 'color',
        value: JSON.stringify(color.rgb),
      }
    })
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '25px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '0.25rem',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          left: 'auto',
          right: 'auto',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        shift: {
          position: 'relative',
          top: '30px'
        },
      },
    })

    return (
      <div className="mr-0 mr-md-4 mb-2 mb-md-0 d-flex justify-content-center">
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        {
          this.state.displayColorPicker ?
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <div style={ styles.shift }>
              <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div>
          </div> : null
        }

      </div>
    )
  }
}

export default SketchExample
