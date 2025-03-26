import {PrimeReactContext} from 'primereact/api';
import {Button} from 'primereact/button';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {RadioButton, RadioButtonChangeEvent} from 'primereact/radiobutton';
import {Sidebar} from 'primereact/sidebar';
import {classNames} from 'primereact/utils';
import {useContext, useEffect, useState} from 'react';
import {AppConfigProps, LayoutConfig, LayoutState} from '~/utilities/types';
import {LayoutContext} from '~/store/layoutcontext';

const AppConfig = (props: AppConfigProps) => {
    const [scales] = useState([10, 11, 12, 13, 14, 15, 16]);
    const {layoutConfig, setLayoutConfig, layoutState, setLayoutState} = useContext(LayoutContext);
    const {setRipple, changeTheme} = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({...prevState, configSidebarVisible: true}));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({...prevState, configSidebarVisible: false}));
    };

    const changeInputStyle = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({...prevState, inputStyle: e.value}));
    };

    const changeRipple = (e: InputSwitchChangeEvent) => {
        setRipple?.(e.value as boolean);
        setLayoutConfig((prevState: LayoutConfig) => ({...prevState, ripple: e.value as boolean}));
    };

    const changeMenuMode = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({...prevState, menuMode: e.value}));
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({...prevState, theme, colorScheme}));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({...prevState, scale: prevState.scale - 1}));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({...prevState, scale: prevState.scale + 1}));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right"
                     className="layout-config-sidebar w-20rem">
                {!props.simple && (
                    <>
                        <h5>Scale</h5>
                        <div className="flex align-items-center">
                            <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text
                                    className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => {
                                    return <i className={classNames('pi pi-circle-fill', {
                                        'text-primary-500': item === layoutConfig.scale,
                                        'text-300': item !== layoutConfig.scale
                                    })} key={item}></i>;
                                })}
                            </div>
                            <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text
                                    className="w-2rem h-2rem ml-2"
                                    disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
                        </div>

                        <h5>Menu Type</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="menuMode" value={'static'}
                                             checked={layoutConfig.menuMode === 'static'}
                                             onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                                <label htmlFor="mode1">Static</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="menuMode" value={'overlay'}
                                             checked={layoutConfig.menuMode === 'overlay'}
                                             onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                                <label htmlFor="mode2">Overlay</label>
                            </div>
                        </div>

                        <h5>Input Style</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value={'outlined'}
                                             checked={layoutConfig.inputStyle === 'outlined'}
                                             onChange={(e) => changeInputStyle(e)}
                                             inputId="outlined_input"></RadioButton>
                                <label htmlFor="outlined_input">Outlined</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value={'filled'}
                                             checked={layoutConfig.inputStyle === 'filled'}
                                             onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                                <label htmlFor="filled_input">Filled</label>
                            </div>
                        </div>

                        <h5>Ripple Effect</h5>
                        <InputSwitch checked={layoutConfig.ripple as boolean}
                                     onChange={(e) => changeRipple(e)}></InputSwitch>
                    </>
                )}
                <div className="grid">
                    <div className='col-12'>Arya</div><div className='col-12'>Arya</div>
                    <div className='col-1'><button onClick={() => _changeTheme('arya-blue', 'light')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('arya-green', 'light')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('arya-orange', 'light')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('arya-purple', 'light')}>4</button></div>
                    <div className='col-12'>Bootstrap</div>
                    <div className='col-1'><button onClick={() => _changeTheme('bootstrap4-dark-blue', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('bootstrap4-dark-purple', 'dark')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('bootstrap4-light-blue', 'light')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('bootstrap4-light-purple', 'light')}>4</button></div>
                    <div className='col-12'>Fluent</div>
                    <div className='col-1'><button onClick={() => _changeTheme('fluent-light', 'light')}>1</button></div>
                    <div className='col-12'>lara</div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-amber', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-blue', 'dark')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-cyan', 'dark')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-green', 'dark')}>4</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-indigo', 'dark')}>5</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-pink', 'dark')}>6</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-purple', 'dark')}>7</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-dark-teal', 'dark')}>8</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-amber', 'light')}>9</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-blue', 'light')}>10</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-cyan', 'light')}>11</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-green', 'light')}>12</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-indigo', 'light')}>13</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-pink', 'light')}>14</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-purple', 'light')}>15</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('lara-light-teal', 'light')}>16</button></div>
                    <div className='col-12'>Luna</div>
                    <div className='col-1'><button onClick={() => _changeTheme('luna-amber', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('luna-blue', 'dark')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('luna-green', 'dark')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('luna-pink', 'dark')}>4</button></div>
                    <div className='col-12'>Material</div>
                    <div className='col-1'><button onClick={() => _changeTheme('md-dark-deeppurple', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('md-dark-indigo', 'dark')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('md-light-deeppurple', 'light')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('md-light-indigo', 'light')}>4</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('mdc-dark-deeppurple', 'dark')}>5</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('mdc-dark-indigo', 'dark')}>6</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('mdc-light-deeppurple', 'light')}>7</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('mdc-light-indigo', 'light')}>8</button></div>
                    <div className='col-12'>Mira</div>
                    <div className='col-1'><button onClick={() => _changeTheme('mira', 'light')}>1</button></div>
                    <div className='col-12'>Nano</div>
                    <div className='col-1'><button onClick={() => _changeTheme('nano', 'light')}>1</button></div>
                    <div className='col-12'>Nova</div>
                    <div className='col-1'><button onClick={() => _changeTheme('nova', 'light')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('nova-accent', 'light')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('nova-alt', 'light')}>3</button></div>
                    <div className='col-12'>Rhea</div>
                    <div className='col-1'><button onClick={() => _changeTheme('rhea', 'light')}>1</button></div>
                    <div className='col-12'>Saga</div>
                    <div className='col-1'><button onClick={() => _changeTheme('saga-blue', 'light')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('saga-green', 'light')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('saga-orange', 'light')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('saga-purple', 'light')}>4</button></div>
                    <div className='col-12'>Soho</div>
                    <div className='col-1'><button onClick={() => _changeTheme('soho-dark', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('soho-light', 'light')}>2</button></div>
                    <div className='col-12'>Tailwind(Bozuk)</div>
                    <div className='col-1'><button onClick={() => _changeTheme('tailwind-tailwind-light', 'light')}>1</button></div>
                    <div className='col-12'>Vela</div>
                    <div className='col-1'><button onClick={() => _changeTheme('vela-blue', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('vela-green', 'dark')}>2</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('vela-orange', 'dark')}>3</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('vela-purple', 'dark')}>4</button></div>
                    <div className='col-12'>Viva</div>
                    <div className='col-1'><button onClick={() => _changeTheme('viva-dark', 'dark')}>1</button></div>
                    <div className='col-1'><button onClick={() => _changeTheme('viva-light', 'light')}>2</button></div>
                </div>
            </Sidebar>
        </>
    );
};

export default AppConfig;
