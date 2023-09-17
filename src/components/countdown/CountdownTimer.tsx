import { useEffect, useRef, useState, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { secondsToTimeObject } from "./utils";
import { z } from "astro/zod";

const Input = styled.input`
  background-color: unset;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 1rem;
  width: 100px;
  border-radius: 1rem;
  font-size: 2rem;
  color: var(--text-main);
`;

const Alert = styled.p`
  color: red;
  font-size: 0.75rem;
`;

const Button = styled.button`
  padding: 0;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  min-width: 100px;
  border-radius: 1rem;
`;

const Digit = styled.div`
  display: flex;
  flex-direction: column;
`;

export function CountdownTimer() {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const Timer = z
    .object({
      hours: z.string(),
      minutes: z.string(),
      seconds: z.string(),
    })
    .superRefine((time, ctx) => {
      const timeIsValid = Object.entries(time).map(
        ([_key, value]) => parseInt(value) > 60
      );
      if (timeIsValid.includes(true)) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 60,
          type: "number",
          inclusive: true,
          message: "Value is too big :(",
        });
      }
      const timeHasCorrectLength = Object.entries(time).map(
        ([_key, value]) => value.length > 2
      );
      if (timeHasCorrectLength.includes(true)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Value is too long. .",
        });
      }
    });
  const defaultValues: Timer = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  type Timer = z.infer<typeof Timer>;

  const [formValue, setFormValue] = useState<Timer>(defaultValues);

  const timerRef = useRef<number>();

  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    setStart(false);
  };

  const resetTimer = () => {
    setRemainingTime(0);
    setFormValue(defaultValues);
    setComplete(false);
  };

  useEffect(() => {
    if (start && remainingTime != null && remainingTime > 0) {
      timerRef.current = window.setTimeout(
        () => setRemainingTime((prevTime) => prevTime - 1),
        1000
      );
    } else if (remainingTime === 0) {
      setStart(false);
      clearTimeout(timerRef.current);
    }

    const { hours, minutes, seconds } = secondsToTimeObject(remainingTime);

    setFormValue({
      ...formValue,
      hours: hours.toString(),
      minutes: minutes.toString(),
      seconds: seconds.toString(),
    });

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [remainingTime, start]);

  const handleOnClickStart = () => startTimer();
  const handleOnClickPause = () => pauseTimer();
  const handleOnClickReset = () => resetTimer();

  const startTimer = () => {
    const totalSeconds =
      parseInt(formValue.hours, 10) * 3600 +
      parseInt(formValue.minutes, 10) * 60 +
      parseInt(formValue.seconds, 10);

    setRemainingTime(totalSeconds);

    setStart(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.getAttribute("data-name");
    const value = e.target.value;
    const formData = {
      ...formValue,
      [name as string]: value,
    };

    const validateFormData = Timer.safeParse(formData);

    if (validateFormData.success) {
      setErrors("");
      setFormValue({
        ...validateFormData.data,
      });
    }
    if (!validateFormData.success) {
      const fieldErrors = validateFormData.error.flatten().formErrors;

      setErrors(fieldErrors[0]);

      setFormValue({
        ...formData,
      });
    }
  };

  const formIsInvalid = !!errors;

  return (
    <div>
      <form>
        <div
          style={{ display: "flex", flexDirection: "row", columnGap: "1rem" }}
        >
          <Digit>
            <Input
              type="number"
              id="hh"
              data-name="hours"
              pattern="\d*"
              inputMode="numeric"
              value={formValue.hours}
              onChange={handleOnChange}
              onClick={() => {
                setFormValue({
                  ...formValue,
                  hours: "",
                });
                setErrors("");
              }}
            />
            <label htmlFor="hh">Hours</label>
          </Digit>
          <Digit>
            <Input
              type="number"
              id="min"
              data-name="minutes"
              pattern="\d*"
              inputMode="numeric"
              value={formValue.minutes}
              onChange={handleOnChange}
              onClick={() => {
                setFormValue({
                  ...formValue,
                  minutes: "",
                });
                setErrors("");
              }}
            />
            <label htmlFor="min">Minutes</label>
          </Digit>
          <Digit>
            <Input
              type="number"
              id="sec"
              data-name="seconds"
              pattern="\d*"
              inputMode="numeric"
              value={formValue.seconds}
              onChange={handleOnChange}
              onClick={() => {
                setFormValue({
                  ...formValue,
                  seconds: "",
                });
                setErrors("");
              }}
            />
            <label htmlFor="sec">Seconds</label>
          </Digit>
        </div>
        {errors && errors.length > 0 && <Alert>Warning: {errors}</Alert>}
      </form>
      <div style={{ marginTop: "20px" }}>
        {!start ? (
          <Button
            type="button"
            onClick={handleOnClickStart}
            disabled={formIsInvalid}
          >
            Start
          </Button>
        ) : (
          <Button onClick={handleOnClickPause}>Pause</Button>
        )}
        <Button onClick={handleOnClickReset}>Reset</Button>
      </div>
      {complete && <p>Yay! Ring ring</p>}
    </div>
  );
}
