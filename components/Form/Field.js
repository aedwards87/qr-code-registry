// Dependencies
import React from 'react'
import styled, { css } from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
import { useController } from 'react-hook-form'
// Assets
import ErrorSVG from '../../assets/svg/Error'
// Hooks
import useToggle from '../../hooks/useToggle'
// Utilities
import { camalise } from '../../utils/helpers'
import { useStateContext } from '../../hooks'

// ------------------------------
// The form field component
// ------------------------------
export default function FormField({
  Element = 'input',
  control,
  type,
  name,
  disabled,
  className,
  placeholder,
  tabIndex,
  rules,
  maxLength,
  customError,
  optional,
}) {
  const [_, setInputValues] = useStateContext()
  const [selected, toggle, bind] = useToggle(false)
  const shouldReduceMotion = useReducedMotion()

  const {
    field,
    fieldState: { invalid, error },
    formState: { errors },
  } = useController({
    name: camalise(name),
    control,
    rules,
  })

  const handleChange = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    field.onChange({
      target: {
        name: field.name,
        value: e.target.value,
      },
    })
  }

  // console.log({ invalid, error });
  // console.log(field.name, field.value !== '' && !invalid || !error);
  // console.log(field.name, customError === '');
  // console.log(field.name, !invalid || !error);
  // console.log(field.name, customError === '');
  // console.log(field.name, field.value !== '' && invalid || error);
  // console.log(field.name, field.value, customError);

  // Reset() function provided by React Hook Forms
  // doesn't clear the errors when fields are reset to
  // their defaultValues, so this custom error checker
  //
  const isCustomError =
    (field.value !== '' && !invalid) || !error
      ? false
      : customError === ''
      ? true
      : field.value === ''
      ? false
      : !invalid || !error
      ? false
      : (field.value !== '' && invalid) || error
      ? true
      : false

  return (
    <LabelContainer>
      <Label className={className} htmlFor={camalise(name)} {...bind}>
        <LabelText
          $isError={isCustomError}
          variants={textVariants(shouldReduceMotion)}
          {...animateProps(selected, field.value)}
        >
          {isCustomError && <ErrorIcon style={{ width: '1rem' }} />}
          {optional ? `${name} (optional)` : name}
        </LabelText>
        <Element
          id={camalise(name)}
          type={type}
          tabIndex={tabIndex}
          aria-selected={selected}
          onClick={toggle}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isCustomError}
          maxLength={maxLength}
          {...field}
          onChange={handleChange}
        />
      </Label>
      {isCustomError && (
        <ErrorContainer>
          <ErrorText>{isCustomError && errors[field.name]?.message}</ErrorText>
        </ErrorContainer>
      )}
    </LabelContainer>
  )
}

// ------------------------------
// Animations
// ------------------------------
const animateProps = (selected, value) => {
  return {
    initial: 'from',
    animate: value ? 'to' : !value && selected ? 'to' : 'from',
  }
}
const textVariants = (shouldReduceMotion) => {
  return {
    from: {
      y: '50%',
      scale: 1.3,
      transition: shouldReduceMotion && {
        duration: 0,
      },
    },
    to: {
      y: '12%',
      scale: 1,
      transition: shouldReduceMotion && {
        duration: 0,
      },
    },
  }
}

// ------------------------------
// Styles
// ------------------------------
const ErrorIcon = styled(ErrorSVG)`
  height: ${20 / 16}rem;
  width: ${20 / 16}rem;
  margin-right: 0.5rem;
`
const LabelContainer = styled.div`
  display: grid;
  align-items: start;
`
const Label = styled.label`
  position: relative;
  input[aria-invalid='true'],
  input[aria-invalid='true']:focus {
    box-shadow: 0 0 0 2px hsl(var(--colorError)),
      0 0 0 6px hsla(var(--colorModeShade) / 0.1);
  }
  > input {
    background: hsla(var(--colorModeShade) / 0.1);
    padding: 1.2rem 1.2rem 0.1rem;
    height: ${70 / 16}rem;
    width: 100%;
    border-radius: ${15 / 16}rem;
    border: none;
    text-overflow: ellipsis;
    color: hsl(var(--colorMode1));
    outline: none;
    &:-webkit-autofill {
      -webkit-text-fill-color: hsl(var(--colorModeText));
      -webkit-box-shadow: 0 0 0px 1000px hsla(var(--colorModeText) / 0.1) inset,
        0 0 0px 1000px hsl(var(--colorMode)) inset;
      /* 0 0 0px 1000px hsla(var(--colorMode) / .4) inset,
        0 0 0px 1000px hsla(var(--colorModeText) / .1) inset; */
      :hover,
      :focus-visible {
        -webkit-text-fill-color: hsl(var(--colorModeText));
        -webkit-box-shadow: 0 0 0px 1000px hsla(var(--colorModeText) / 0.1)
            inset,
          0 0 0px 1000px hsl(var(--colorMode)) inset,
          0 0 0 2px hsla(var(--colorModeLink)),
          0 0 0 6px hsla(var(--colorModeShade) / 0.1);
      }
    }
    &:focus-visible {
      box-shadow: 0 0 0 2px hsla(var(--colorModeLink)),
        0 0 0 6px hsla(var(--colorModeShade) / 0.1);
    }
  }
`

const LabelText = styled(motion.p)`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.2rem;
  font-size: ${12 / 16}rem;
  font-weight: var(--fontWeightMedium);
  color: hsl(var(--colorModeDot));
  pointer-events: none;
  transition: all 0.3 ease;
  transform-origin: left;
  bottom: 50%;
  ${({ $isError }) =>
    $isError &&
    css`
      color: hsl(var(--colorError));
    `}
`

const ErrorContainer = styled.div`
  svg {
    width: ${20 / 16}rem;
    height: 100%;
  }
`

const ErrorText = styled(LabelText)`
  position: revert;
  font-size: ${12 / 16}rem;
  padding-left: 0;
  padding-right: 0;
  line-height: 1.3;
  color: hsl(var(--colorError));
  padding-bottom: 0;
`
