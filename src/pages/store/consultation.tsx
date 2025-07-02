import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/custom/stepper";
import { ConsultationStepOne, ConsultationStepTwo } from "@/components/pages/store/consultation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { stepTitles, useStepConsultation } from "@/hooks/use-step-consultation";
import { Bot, Check, HelpCircle, MessageSquare, Phone } from "lucide-react";

export default function ConsultationPage() {
  const { currentStep, totalSteps } = useStepConsultation();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ConsultationStepOne />
      case 2:
        return <ConsultationStepTwo />
      // case 3:
      //   return <Step3OrderInformation />
      // case 4:
      //   return <Step4Confirmation />
      // case 5:
      //   return <Step5Invoice />
      // case 6:
      //   return <Step6Feedback />
      default:
        return null
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-emerald-950/20">
      <div className="container-wrapper">
        <div className="container py-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Tư vấn thuốc AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Nhận tư vấn chuyên nghiệp và đặt thuốc trực tuyến
            </p>
          </div>
          {/* Main Layout - 2 Columns */}
          <div className="grid lg:grid-cols-12 max-w-8xl gap-8">
            {/* Left Column - Interactive Content */}
            <div className="lg:col-span-8">
              <Card className="shadow-xl border-green-200 dark:border-green-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  {renderCurrentStep()}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Steps Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Progress Overview */}
                <Card className="border-green-200 dark:border-green-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
                  <CardHeader className="">
                    <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      Tiến trình
                    </CardTitle>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Bước {currentStep} / {totalSteps}</span>
                      <span>{Math.round(progressPercentage)}% hoàn thành</span>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className="h-3 bg-teal-100 dark:bg-teal-900/30"
                    />
                  </CardHeader>
                </Card>

                {/* Steps List */}
                <Card className="border-green-200 dark:border-green-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-card-foreground">
                      Các bước thực hiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Stepper value={currentStep} orientation="vertical">
                      {stepTitles.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;
                        const IconComponent = step.icon;

                        return (
                          <StepperItem
                            key={index}
                            step={stepNumber}
                            className="relative items-start not-last:flex-1"
                          >
                            <StepperTrigger
                              className="items-start rounded pb-16 last:pb-0 cursor-default pointer-events-none"
                            >
                              <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                                ${isCompleted
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                                  : isCurrent
                                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white ring-4 ring-green-200 dark:ring-green-800 shadow-lg'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                }
                              `}>
                                {isCompleted ? (
                                  <Check className="w-6 h-6" />
                                ) : (
                                  <IconComponent className="w-6 h-6" />
                                )}
                              </div>
                              <div className="mt-1 space-y-1.5 px-4 text-left">
                                <StepperTitle className={`
                                  text-lg transition-colors duration-300 leading-tight
                                  ${isCompleted
                                    ? 'text-green-700 dark:text-green-300 font-semibold'
                                    : isCurrent
                                      ? 'text-green-800 dark:text-green-200 font-semibold'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }
                                `}>
                                  {step.title}
                                </StepperTitle>
                                <StepperDescription className={`
                                  text-base transition-colors duration-300
                                  ${isCompleted
                                    ? 'text-green-600 dark:text-green-400'
                                    : isCurrent
                                      ? 'text-green-700 dark:text-green-300'
                                      : 'text-gray-400 dark:text-gray-500'
                                  }
                                `}>
                                  {step.description}
                                </StepperDescription>
                              </div>
                            </StepperTrigger>
                            {index < stepTitles.length - 1 && (
                              <StepperSeparator className={`
                                absolute inset-y-0 top-[calc(2.9rem+0.125rem)] left-6 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]
                                transition-colors duration-300
                                ${stepNumber < currentStep
                                  ? 'data-[orientation=vertical]:bg-gradient-to-b data-[orientation=vertical]:from-green-500 data-[orientation=vertical]:to-emerald-500'
                                  : 'bg-gray-200 dark:bg-gray-700'
                                }
                              `} />
                            )}
                          </StepperItem>
                        );
                      })}
                    </Stepper>
                  </CardContent>
                </Card>

                {/* Help & Support */}
                <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-card-foreground">
                        Cần hỗ trợ?
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Liên hệ với chúng tôi nếu bạn cần hỗ trợ trong quá trình đặt hàng.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-foreground">Hotline: 1900-1234</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-foreground">Chat trực tuyến 24/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}