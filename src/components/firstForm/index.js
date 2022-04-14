import React, { useState, useEffect } from "react";
import { PREDEFINED_COLORS } from "../../utils/const";
import { RGBToSaturation } from "../../utils/helpers";
import { hexToRgb, RGBToHex } from "../../utils/helpers";
const getDatafromLS = () => {
    const data = localStorage.getItem("colors");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
};
const Firstform = () => {
    const [formValues, setFormValues] = useState({ text: "" });
    const [formErrors, setFormErrors] = useState({});
    const [opt, setOpt] = useState("list");
    const [colorList, setColorList] = useState(PREDEFINED_COLORS);
    // input field states
    const [title, setTitle] = useState("");
    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setTitle(e.target.value);
    };
    //form submission handler
    const onSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));
        if (validate(formValues)) {
            // console.log("zwalidowany", formValues.text);
            const [red, green, blue] = formValues.text.split(",");
            const isHex = formValues.text.includes("#");
            let color = {
                id: new Date().getTime().toString(),
                title,
                isRemovable: true,
                isHex,
            };
            if (isHex) {
                color.nameHex = formValues.text;
                console.log(hexToRgb(color.nameHex))
                const { red, green, blue } = hexToRgb(formValues.text)
                color.red = red;
                color.green = green;
                color.blue = blue;
            } else {
                color.red = red;
                color.green = green;
                color.blue = blue;
                color.nameHex = RGBToHex(color.red, color.red, color.red)
                console.log(RGBToHex(123, 123, 123))
            }
            // console.log([...colorList, color], "[...colorList, color]");
            const newColorList = [...colorList, color];
            const newUserColorList = newColorList.filter(
                (color) => color.isRemovable
            );
            // setColors([...colors, color]);
            setColorList(newColorList);
            localStorage.setItem("colors", JSON.stringify(newUserColorList));
            setTitle("");
        }
    };
    useEffect(() => {
        setColorList([...colorList, ...getDatafromLS()]);
    }, []);
    //form validation handler
    const validate = (values) => {
        let errors = {};
        const regex =
            /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/i;
        if (!values.text) {
            errors.text = "Cannot be blank";
        } else if (!regex.test(values.text)) {
            errors.text =
                "Only RGB format example: 125,125,125 or HEX format exampe #001dab";
        } else if (regex.test(values.text)) {
            return true;
        }
        setFormErrors(errors);
        return false;
    };

    // delete color from LS
    const deleteColor = (id) => {
        const filteredColors = colorList.filter((element, index) => {
            return element.id !== id;
        });
        const newUserColorList = filteredColors.filter(
            (color) => color.isRemovable
        );
        setColorList(filteredColors);
        localStorage.setItem("colors", JSON.stringify(newUserColorList));
    };

    useEffect(() => {
        // const kolor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
        // document.documentElement.style.setProperty('--accent-color', kolor)

        var elem = document.querySelectorAll(".rectangle");
        for (let i = 0; i < elem.length; i++) {
            const isHex = elem[i].getAttribute("data-isHex") === "true";
            //console.log(elem[i].getAttribute("data-color"), "datacolor");
            // if (isHex) {
            //     elem[i].style.backgroundColor = elem[i].getAttribute('data-color');
            // }

            elem[i].style.backgroundColor = elem[i].getAttribute("data-color");
        }
    }, [colorList, colorList.length]);
    const putColor = (kolor) => {
        document.documentElement.style.setProperty("--accent-color", kolor);
    };
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
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
                <label>color</label>
                <select value={opt} onChange={(e) => setOpt(e.target.value)}>
                    <option value="list"> all</option>
                    <option value="red50"> red > 127</option>
                    <option value="green50"> green > 127</option>
                    <option value="blue50"> blue > 127</option>
                    <option value="Sat50"> Saturation > 50%</option>
                </select>
                List length: {colorList.length}
                {colorList
                    .filter((color) => {
                        if (opt === "list") return true;
                        else if (opt === "red50") {
                            return color.red > 127;
                        } else if (opt === "green50") {
                            return color.green > 127;
                        } else if (opt === "blue50") {
                            return color.blue > 127;
                        } else if (opt === "Sat50") {
                            const saturation = RGBToSaturation(
                                color.red,
                                color.green,
                                color.blue
                            );
                            return saturation > 50;
                        } return true
                    })
                    .sort((a, b) => {
                        if (b.red === a.red) {
                            if (b.green === a.green) {
                                return b.blue - a.blue;
                            }
                            return b.green - a.green;
                        }
                        return b.red - a.red;
                    })
                    .map((color, index) => {
                        return (
                            <div key={index}>
                                <div
                                    data-color={
                                        color.isHex
                                            ? color.nameHex
                                            : `rgb(${color.red},${color.green},${color.blue})`
                                    }
                                    className="rectangle"
                                ></div>
                                HEX:{color.nameHex}, RGB({color.red}, {color.green},{" "}
                                {color.blue})
                                {color.isRemovable && (
                                    <button onClick={() => deleteColor(color.id)}>delete</button>
                                )}
                            </div>
                        );
                    })}
                <div>
                    {/* {colorList.length > 0 && <>
                        <div >
                            {colorList.map((color, colorIndex) => (
                                <div key={colorIndex}>
                                    <div data-title={color.title} className="rectangle rectangle17 "></div>
                                    <div >{color.title}</div>
                                    <div onClick={() => deleteBook(color.title)}>
                                        <button>delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setColors([])}>Remove All</button>
                    </>} */}
                </div>
            </div>
        </div>
    );
};
export default Firstform;
