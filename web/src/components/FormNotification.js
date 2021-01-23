import React from "react"
import PropTypes from "prop-types"

class FormNotification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorClass: "bg-red-200 text-red-500 border border-red-500",
            greenClass: "bg-green-200 text-green-500 border border-green-500",
        }
    }

    render() {
        let classColor = ""

        if (this.props.type === "error" || this.props.error)
            classColor = this.state.errorClass
        else if (this.props.type === "success" || this.props.success)
            classColor = this.state.greenClass
        return (
            <div className={classColor + " text-center border rounded-xl w-full px-4 py-2"}>
                <div className="font-bold">
                    {this.props.title}
                </div>
                {this.props.message}
            </div>
        )
    }
}

FormNotification.propTypes = {
    type: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
}

export default FormNotification
