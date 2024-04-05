import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Button,
  Divider,
  Flex,
  Icon,
  useToast,
  Box,
  AccordionPanel,
} from '@chakra-ui/react';
import { CustomInput } from '../CustomInput';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FormBuilderInput } from './interface';
import { GenericFormTextInput } from './GenericFormTextInput';
import { QuestionInput } from './QuestionInput';
import { FiPlusCircle } from 'react-icons/fi';
import { axios } from '@/utils';
import { useRouter } from 'next/router';

export const FormBuilder = () => {
  const router = useRouter();
  const methods = useForm<FormBuilderInput>({
    defaultValues: {
      questions: [{ type: 'TEXT', question: '', rangeFrom: 1, rangeTo: 3 }],
    },
  });
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  });
  const toast = useToast();

  const onSubmit = async (data: FormBuilderInput) => {
    if (data.admissionYearFrom === -1) delete data.admissionYearFrom;
    if (data.admissionYearTo === -1) delete data.admissionYearTo;
    if (data.graduateYearFrom === -1) delete data.graduateYearFrom;
    if (data.graduateYearTo === -1) delete data.graduateYearTo;

    data.questions.forEach((q) => {
      if (q.type !== 'RADIO' && q.type !== 'CHECKBOX') {
        delete q.options;
      }

      if (q.type !== 'RANGE') {
        delete q.rangeFrom;
        delete q.rangeTo;
      }
    });

    const dataWithOrder = {
      ...data,
      questions: data.questions.map((q, questionIdx) => {
        return {
          ...q,
          order: questionIdx,
          options: q.options?.map((o, optionIdx) => {
            return { ...o, order: optionIdx };
          }),
        };
      }),
    };

    try {
      await axios.post(`/survey`, {
        ...dataWithOrder,
      });

      toast({
        title: 'Berhasil menyimpan survey!',
        status: 'success',
      });

      router.push('/survey-management');
    } catch (e: any) {
      console.log(e);
      toast({
        title: 'Gagal menyimpan survey',
        status: 'error',
      });
    }
  };

  const startTime = watch('startTime');
  const admissionYearFrom = watch('admissionYearFrom');
  const graduateYearFrom = watch('graduateYearFrom');

  return (
    <form
      className="flex flex-col gap-4 p-4 md:px-40 lg:px-60"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <section className="flex flex-col gap-6 py-2 px-4 rounded-xl bg-white">
          <GenericFormTextInput
            placeholder="Judul Survey"
            fontSize={32}
            py={8}
            register={{
              ...register('title', { required: 'Masukkan judul survey' }),
            }}
            error={errors.title?.message}
          />
          <GenericFormTextInput
            placeholder="Deskripsi"
            register={{ ...register('description') }}
          />
          <CustomInput
            type="select"
            name="type"
            register={{
              ...register('type', { required: 'Pilih tipe survey' }),
            }}
            label="Tipe Survey"
            selectOptions={
              <>
                <option value="CURRICULUM">Kurikulum</option>
                <option value="CAREER">Karir</option>
              </>
            }
          />

          <Flex
            direction={{
              base: 'column',
              lg: 'row',
            }}
            gap={6}
          >
            <CustomInput
              type="datetime-local"
              label="Tanggal Mulai"
              name="startTime"
              register={{
                ...register('startTime', {
                  valueAsDate: true,
                  required: 'Masukkan waktu mulai survey',
                }),
              }}
              error={errors.startTime?.message}
            />

            <CustomInput
              type="datetime-local"
              label="Tanggal Selesai"
              name="endTime"
              register={{
                ...register('endTime', {
                  valueAsDate: true,
                  required: 'Masukkan waktu selesai survey',
                  validate: (value) =>
                    value > startTime ||
                    'Waktu selesai survey harus lebih akhir dari waktu mulai',
                }),
              }}
              error={errors.endTime?.message}
            />
          </Flex>

          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Batasan (opsional)
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column">
                  <Box as="span" fontWeight={500}>
                    Tahun masuk alumni
                  </Box>
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={2}
                    alignItems={{ base: 'start', md: 'center' }}
                    w={{
                      base: '60%',
                      sm: '40%',
                      md: '85%',
                      lg: '75%',
                      xl: '50%',
                    }}
                  >
                    <CustomInput
                      type="select"
                      name="admissionYearFrom"
                      error={errors.admissionYearTo?.message}
                      register={{
                        ...register('admissionYearFrom', {
                          valueAsNumber: true,
                        }),
                      }}
                      selectOptions={
                        <>
                          <option value={-1}>Tidak diset</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1944 },
                            (_, index) => (
                              <option key={index} value={1945 + index}>
                                {1945 + index}
                              </option>
                            ),
                          )}
                        </>
                      }
                    />
                    <span className="pl-4 md:pl-0">hingga</span>
                    <CustomInput
                      type="select"
                      name="admissionYearTo"
                      error={errors.admissionYearTo?.message}
                      register={{
                        ...register('admissionYearTo', {
                          valueAsNumber: true,
                          validate: (year) => {
                            if (
                              year === undefined ||
                              year === -1 ||
                              admissionYearFrom === undefined ||
                              year === -1
                            )
                              return true;
                            return (
                              year >= admissionYearFrom ||
                              'Batasan tahun masuk tidak valid'
                            );
                          },
                        }),
                      }}
                      selectOptions={
                        <>
                          <option value={-1}>Tidak diset</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1944 },
                            (_, index) => (
                              <option key={index} value={1945 + index}>
                                {1945 + index}
                              </option>
                            ),
                          )}
                        </>
                      }
                    />
                  </Flex>
                </Flex>

                <Flex direction="column" pt={4}>
                  <Box as="span" fontWeight={500}>
                    Tahun lulus alumni
                  </Box>
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={2}
                    alignItems={{ base: 'start', md: 'center' }}
                    w={{
                      base: '60%',
                      sm: '40%',
                      md: '85%',
                      lg: '75%',
                      xl: '50%',
                    }}
                  >
                    <CustomInput
                      type="select"
                      name="graduateYearFrom"
                      error={errors.graduateYearTo?.message}
                      register={{
                        ...register('graduateYearFrom', {
                          valueAsNumber: true,
                        }),
                      }}
                      selectOptions={
                        <>
                          <option value={-1}>Tidak diset</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1944 },
                            (_, index) => (
                              <option key={index} value={1945 + index}>
                                {1945 + index}
                              </option>
                            ),
                          )}
                        </>
                      }
                    />
                    <span className="pl-4 md:pl-0">hingga</span>
                    <CustomInput
                      type="select"
                      name="graduateYearTo"
                      error={errors.graduateYearTo?.message}
                      register={{
                        ...register('graduateYearTo', {
                          valueAsNumber: true,
                          validate: (year) => {
                            if (
                              year === undefined ||
                              year === -1 ||
                              graduateYearFrom === undefined ||
                              year === -1
                            )
                              return true;
                            return (
                              year >= graduateYearFrom ||
                              'Batasan tahun masuk tidak valid'
                            );
                          },
                        }),
                      }}
                      selectOptions={
                        <>
                          <option value={-1}>Tidak diset</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1944 },
                            (_, index) => (
                              <option key={index} value={1945 + index}>
                                {1945 + index}
                              </option>
                            ),
                          )}
                        </>
                      }
                    />
                  </Flex>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="flex flex-col gap-6 p-4 rounded-xl bg-white items-center">
          {fields.map((q, idx) => (
            <Flex direction="column" w="full" gap={6} key={idx}>
              <QuestionInput
                key={q.id}
                index={idx}
                remove={() => remove(idx)}
              />
              {idx < fields.length - 1 && (
                <Divider key={idx} borderColor="gray" borderWidth={1.5} />
              )}
            </Flex>
          ))}

          <Button
            type="button"
            w={{ base: 'full', md: 'fit-content' }}
            bgColor="blue.500"
            color="white"
            leftIcon={<Icon as={FiPlusCircle} />}
            onClick={() =>
              append({ type: 'TEXT', question: '', rangeFrom: 1, rangeTo: 3 })
            }
            _hover={{
              bgColor: 'blue.600',
            }}
          >
            Tambah Pertanyaan
          </Button>
        </section>
      </FormProvider>
      <Button
        type="submit"
        w={{ base: 'full', md: 'fit-content' }}
        bgColor="blue.500"
        color="white"
        _hover={{
          bgColor: 'blue.600',
        }}
        alignSelf="end"
        isLoading={isSubmitting}
      >
        Simpan
      </Button>
    </form>
  );
};
