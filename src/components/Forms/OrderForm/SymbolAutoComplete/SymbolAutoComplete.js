import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SymbolAutoComplete = ({symbol, symbols, onSymbolChange}) => {
    return (
        <Autocomplete
            value={symbol}
            freeSolo
            className="symbol-input"
            options={symbols}
            autoHighlight
            getOptionLabel={(option) => {
                if (option.Name) {
                    return (option.Symbol)
                }
                return symbol
            }}
            style={{
                width: 200,
                margin: "auto",
                borderRadius: 5
            }}
            renderOption={(option) => {
                if (option.Name) {
                    return (
                        <div>
                            <div>{(option.Symbol)}</div>
                            <div className="company-name"> {option.Name}</div>
                        </div>
                    )
                }
                return (null)
            }}
            renderInput={(params) => (
                <TextField
                    value={symbol}
                    required
                    onChange={onSymbolChange}
                    {...params}
                    variant="outlined"
                />
            )}
        />
    )
}

export default SymbolAutoComplete