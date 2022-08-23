import React from "react";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
function CandidateRegister() {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Box>
      <Stack direction="row">
        {/* Left steps */}
        <Stack flex={1} bg={useColorModeValue("gray.100", "gray.900")} p={3}>
          <Text>JOB ALERT</Text>
          <Steps activeStep={1} orientation='vertical'>
            <Step label={"ONE"}>"HELLO ONE"</Step>
            <Step label={"ONE"}>"HELLO ONE"</Step>
            <Step label={"ONE"}>"HELLO ONE"</Step>
          </Steps>
        </Stack>

        {/* Right Content */}
        <Stack flex={4} bgColor="blue">
          <Text>Hello2</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CandidateRegister;
