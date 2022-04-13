import React, { useState, useEffect } from "react";
const Firstform = () => {
    const [formValues, setFormValues] = useState({ text: "" });
    const [formErrors, setFormErrors] = useState({});
    const [range, setRange] = useState("default");
    const ColorList = [
        { nameHex: '#000000', red: 0, green: 0, blue: 0, class: 'rectangel rectangel1' },
        { nameHex: '#FFFFFF', red: 255, green: 255, blue: 255, nameRGB: '255,255,255', class: 'rectangel rectangel2' },
        { nameHex: '#FF0000', red: 255, green: 0, blue: 0, nameRGB: '255,0,0', class: 'rectangel rectangel3' },
        { nameHex: '#00FF00', red: 0, green: 255, blue: 0, nameRGB: '0,255,0', class: 'rectangel rectangel4' },
        { nameHex: '#0000FF', red: 0, green: 0, blue: 255, nameRGB: '0,0,255', class: 'rectangel rectangel5' },
        { nameHex: '#FFFF00', red: 255, green: 255, blue: 0, nameRGB: '255,255,0', class: 'rectangel rectangel6' },
        { nameHex: '#00FFFF', red: 0, green: 255, blue: 255, nameRGB: '0,255,255', class: 'rectangel rectangel7' },
        { nameHex: '#FF00FF', red: 255, green: 0, blue: 255, nameRGB: '255,0,255', class: 'rectangel rectangel8' },
        { nameHex: '#C0C0C0', red: 192, green: 192, blue: 192, nameRGB: '192,192,192', class: 'rectangel rectangel9' },
        { nameHex: '#808080', red: 128, green: 128, blue: 128, nameRGB: '128,128,128', class: 'rectangel rectangel10' },
        { nameHex: '#800000', red: 128, green: 0, blue: 0, nameRGB: '128,0,0', class: 'rectangel rectangel11' },
        { nameHex: '#808000', red: 128, green: 128, blue: 0, nameRGB: '128,128,0', class: 'rectangel rectangel12' },
        { nameHex: '#008000', red: 0, green: 128, blue: 0, nameRGB: '0,128,0', class: 'rectangel rectangel13' },
        { nameHex: '#800080', red: 128, green: 0, blue: 128, nameRGB: '128,0,128', class: 'rectangel rectangel14' },
        { nameHex: '#008080', red: 0, green: 128, blue: 128, nameRGB: '0,128,128', class: 'rectangel rectangel15' },
        { nameHex: '#000080', red: 0, green: 0, blue: 128, nameRGB: '0,0,128', class: 'rectangel rectangel16' },
    ]
    const list = ColorList.sort((a, b) => {
        if (b.red === a.red) {
            if (b.green === a.green) {
                return b.blue - a.blue
            } return b.green - a.green
        }
        return b.red - a.red
    })
    const red50 = list.filter((el) => el.red > 127)
    const green50 = list.filter((el) => el.green > 127)
    const blue50 = list.filter((el) => el.blue > 127)
    const [opt, setOpt] = useState(list)
    const Change = (event) => {
        setOpt(event.target.value)
        console.log(opt)

    }
    const ColorListRGB = [
        { nameRGB: '(0,0,0)', class: 'rectangel rectangel1' },
        { nameRGB: '(255,255,255)', class: 'rectangel rectangel2' },
        { nameRGB: '(255,0,0)', class: 'rectangel rectangel3' },
        { nameRGB: '(0,255,0)', class: 'rectangel rectangel4' },
        { nameRGB: '(0,0,255)', class: 'rectangel rectangel5' },
        { nameRGB: '(255,255,0)', class: 'rectangel rectangel6' },
        { nameRGB: '(0,255,255)', class: 'rectangel rectangel7' },
        { nameRGB: '(255,0,255)', class: 'rectangel rectangel8' },
        { nameRGB: '(192,192,192)', class: 'rectangel rectangel9' },
        { nameRGB: '(128,128,128)', class: 'rectangel rectangel10' },
        { nameRGB: '(128,0,0)', class: 'rectangel rectangel11' },
        { nameRGB: '(128,128,0)', class: 'rectangel rectangel12' },
        { nameRGB: '(0,128,0)', class: 'rectangel rectangel13' },
        { nameRGB: '(128,0,128)', class: 'rectangel rectangel14' },
        { nameRGB: '(0,128,128)', class: 'rectangel rectangel15' },
        { nameRGB: '(0,0,128)', class: 'rectangel rectangel16' }
    ]
    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setTitle(e.target.value)
    };
    //form submission handler
    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
    };
    //form validation handler
    const validate = (values) => {
        let errors = {};
        const regex = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/i;

        if (!values.text) {
            errors.text = "Cannot be blank";
        } else if (!regex.test(values.text)) {
            errors.text = "Only RGB format example: 125,125,125 or HEX format exampe #001dab";
        } else if (regex.test(values.text)) {
            let color = {
                id: new Date().getTime().toString(),
                title,
            }
            setColors([...colors, color]);
            setTitle('');
        } return errors;

    };
    const getDatafromLS = () => {
        const data = localStorage.getItem('colors');
        if (data) {
            return JSON.parse(data);
        }
        else {
            return []
        }
    }
    const [colors, setColors] = useState(getDatafromLS());
    // input field states
    const [title, setTitle] = useState('');
    // delete color from LS
    const deleteBook = (title) => {
        const filteredBooks = colors.filter((element, index) => {
            return element.title !== title
        })
        setColors(filteredBooks);
    }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('colors', JSON.stringify(colors));
    }, [colors])
    useEffect(() => {
        console.log(opt)
        const kolor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
        document.documentElement.style.setProperty('--accent-color', kolor)
        var elem = document.querySelectorAll('.rectangel17');
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.backgroundColor = "red";
        }
    }, [])
    const putColor = (kolor) => {
        document.documentElement.style.setProperty('--accent-color', kolor)
    }

    return (
        <div>
            <div >
                <form onSubmit={onSubmit} noValidate>
                    <div >
                        <label htmlFor="text">color</label>
                        <input
                            type="text"
                            name="text"
                            onChange={handleChange}
                            value={title}
                        />
                        {formErrors.text && (
                            <span className="error">{formErrors.text}</span>
                        )}
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div>
                <p>hex</p>
                <form>
                    <label htmlFor="text">color</label>
                    <select value={range} onChange={Change}>
                        <option value='choose'>choose</option>
                        <option value={red50}> red > 128</option>
                        <option value={green50}> green > 128</option>
                        <option value={blue50}> blue > 128</option>
                    </select>
                </form>

                {
                    opt.map((color, index) => {
                        return (
                            <div key={index}>
                                <div className={color.class}></div>
                                HEX:{color.nameHex}, RGB({color.red}, {color.green}, {color.blue})
                            </div >
                        )
                    })
                }
                <div >
                    {colors.length > 0 && <>
                        <div >
                            {colors.map(color => (
                                <div key={color.title}>
                                    <div data-title={color.title} className="rectangel rectangel17 "></div>
                                    <div >{color.title}</div>
                                    <div onClick={() => deleteBook(color.title)}>
                                        <button>delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setColors([])}>Remove All</button>
                    </>}
                </div>
            </div>

        </div >
    );
}
export default Firstform;