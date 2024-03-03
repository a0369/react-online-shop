import { HStack, Button, Input, useNumberInput } from "@chakra-ui/react";

export function AltNumInput(props) {
    const callOnChange = (newStrVal, newIntVal) => {
        props.valChanged(newIntVal);
    }

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        value: props.value,
        min: 1,
        max: 10,
        onChange: callOnChange
    })
  
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()
  
    return (
      <HStack maxW='320px'>
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
    )
  }