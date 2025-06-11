import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your verification code: {otp}</Preview>

      <Section style={{ backgroundColor: "#f4f4f7", padding: "40px 0" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            fontFamily: "Roboto, Verdana, sans-serif",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Row>
            <Heading
              as="h2"
              style={{
                color: "#333",
                fontSize: "20px",
                marginBottom: "16px",
              }}
            >
              Hello {username},
            </Heading>
          </Row>

          <Row>
            <Text
              style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}
            >
              Thank you for signing up! Please use the verification code below
              to complete your registration:
            </Text>
          </Row>

          <Row>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#111",
                textAlign: "center",
                letterSpacing: "4px",
                marginBottom: "24px",
              }}
            >
              {otp}
            </Text>
          </Row>

          <Row>
            <Text style={{ fontSize: "14px", color: "#888" }}>
              If you did not request this code, please ignore this message.
            </Text>
          </Row>
        </Container>
      </Section>
    </Html>
  );
}
