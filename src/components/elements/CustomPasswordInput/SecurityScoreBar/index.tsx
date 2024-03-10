import { Box, Flex, Text } from '@chakra-ui/react';
import { ScoreBarProps } from './interface';
import { TiWarning } from 'react-icons/ti';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { SCORE_OPTIONS } from './constants';

export const SecurityScoreBar: React.FC<ScoreBarProps> = ({ score }) => {
  return (
    <Flex direction="column" gap={0.25}>
      <Flex alignItems="center" gap={1}>
        {score <= 2 ? (
          <TiWarning color={SCORE_OPTIONS[score].color} />
        ) : (
          <IoCheckmarkCircle color={SCORE_OPTIONS[score].color} />
        )}
        <Flex w="full" gap={1} h={8} py={2.5}>
          {[0, 1, 2, 3, 4].map((e) => {
            const color = e <= score ? SCORE_OPTIONS[score].color : '#c8c8c8';
            if (e === 0) {
              return (
                <Box
                  key={e}
                  bgColor={color}
                  h="full"
                  w="20%"
                  roundedLeft={24}
                />
              );
            }
            if (e === 4) {
              return (
                <Box
                  key={e}
                  bgColor={color}
                  h="full"
                  w="20%"
                  roundedRight={24}
                />
              );
            }
            return <Box key={e} bgColor={color} h="full" w="20%" />;
          })}
        </Flex>
      </Flex>
      <Text fontSize={12}>
        Kerentanan Password:{' '}
        <span
          style={{
            color: SCORE_OPTIONS[score].color,
          }}
        >
          {SCORE_OPTIONS[score].message}
        </span>
      </Text>
    </Flex>
  );
};
