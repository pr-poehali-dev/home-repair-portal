import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const services = [
  {
    id: 1,
    title: "Косметический ремонт",
    description: "Обои, покраска, мелкие работы",
    price: "от 2500₽/м²",
    icon: "PaintBucket",
    features: ["Поклейка обоев", "Покраска стен", "Мелкий ремонт"]
  },
  {
    id: 2,
    title: "Капитальный ремонт",
    description: "Полная перепланировка и отделка",
    price: "от 8000₽/м²",
    icon: "Hammer",
    features: ["Демонтаж", "Перепланировка", "Полная отделка"]
  },
  {
    id: 3,
    title: "Ремонт ванной",
    description: "Сантехника, плитка, гидроизоляция",
    price: "от 5500₽/м²",
    icon: "Droplets",
    features: ["Укладка плитки", "Установка сантехники", "Гидроизоляция"]
  },
  {
    id: 4,
    title: "Электрика",
    description: "Монтаж проводки и освещения",
    price: "от 1200₽/точка",
    icon: "Zap",
    features: ["Замена проводки", "Установка розеток", "Монтаж освещения"]
  },
  {
    id: 5,
    title: "Сантехнические работы",
    description: "Установка и замена оборудования",
    price: "от 3000₽",
    icon: "Wrench",
    features: ["Замена труб", "Установка сантехники", "Ремонт систем"]
  },
  {
    id: 6,
    title: "Напольные покрытия",
    description: "Ламинат, паркет, плитка",
    price: "от 800₽/м²",
    icon: "Grid3x3",
    features: ["Ламинат", "Паркетная доска", "Керамогранит"]
  }
];

const reviews = [
  {
    name: "Анна Петрова",
    rating: 5,
    text: "Сделали капитальный ремонт квартиры за 2 месяца. Качество отличное, все точно в срок!",
    date: "15 ноября 2024"
  },
  {
    name: "Дмитрий Соколов",
    rating: 5,
    text: "Ребята профессионалы своего дела. Ремонт ванной комнаты выполнен безупречно.",
    date: "28 октября 2024"
  },
  {
    name: "Елена Морозова",
    rating: 5,
    text: "Быстро, качественно, недорого. Косметический ремонт сделали за неделю. Рекомендую!",
    date: "3 ноября 2024"
  }
];

const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

export default function Index() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setIsBookingOpen(false);
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setName("");
    setPhone("");
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-primary via-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                  <Icon name="Home" className="text-white" size={22} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-2xl blur opacity-30 -z-10"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">KapitalRu</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <a href="#services" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">Услуги</a>
              <a href="#portfolio" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">Портфолио</a>
              <a href="#about" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">О нас</a>
              <a href="#reviews" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">Отзывы</a>
              <a href="#contacts" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">Контакты</a>
            </div>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Icon name="Calendar" className="mr-2" size={18} />
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Запись на услугу</DialogTitle>
                  <DialogDescription>Выберите услугу, дату и время для консультации</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label>Услуга *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Дата визита *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Время *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ваше имя *</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Иванов" />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (999) 123-45-67" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Комментарий</Label>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Опишите задачу или задайте вопрос..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleBooking} className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Работаем с 2012 года</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                Ремонт вашей
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                мечты
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              Превращаем обычные помещения в пространства, где хочется жить. 
              Более 500 довольных клиентов по всей России.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Бесплатная консультация
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-secondary/50 transition-all">
                <Icon name="Calculator" className="mr-2" size={20} />
                Рассчитать стоимость
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-foreground/60">Завершенных проектов</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">12</div>
                <div className="text-sm text-foreground/60">Лет на рынке</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-foreground/60">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Наши услуги</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Что мы делаем</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Полный спектр работ для вашего идеального пространства
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} className="text-primary" size={28} />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{service.price}</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Icon name="Briefcase" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Портфолио</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Наши работы</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Реализованные проекты, которыми мы гордимся
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Home", title: "Квартира в ЖК \"Новая Москва\"", desc: "Капитальный ремонт, 85 м²", time: "3 месяца", date: "Октябрь 2024" },
              { icon: "Bath", title: "Ванная комната премиум", desc: "Полная перепланировка, 12 м²", time: "1 месяц", date: "Сентябрь 2024" },
              { icon: "Sofa", title: "Гостиная в стиле лофт", desc: "Дизайнерский ремонт, 45 м²", time: "2 месяца", date: "Ноябрь 2024" },
              { icon: "Utensils", title: "Кухня-студия", desc: "Современный дизайн, 30 м²", time: "1.5 месяца", date: "Август 2024" },
              { icon: "Building", title: "Офисное помещение", desc: "Коммерческий ремонт, 120 м²", time: "4 месяца", date: "Июль 2024" },
              { icon: "Bed", title: "Спальня в минимализме", desc: "Косметический ремонт, 25 м²", time: "3 недели", date: "Декабрь 2024" }
            ].map((item, idx) => (
              <Card key={idx} className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-purple-600/10 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name={item.icon as any} size={80} className="text-primary/30 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">Завершено</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Срок выполнения:</span>
                      <span className="font-semibold">{item.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Дата:</span>
                      <span className="font-semibold">{item.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">О компании</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Мы создаем пространства мечты</h2>
              <p className="text-lg text-foreground/60 leading-relaxed">
                KapitalRu — это команда профессионалов с 12-летним опытом в сфере ремонта и отделки. 
                Мы не просто выполняем работы, мы воплощаем ваши идеи в реальность, добавляя творческий подход и внимание к деталям.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    <span className="font-semibold">Гарантия качества</span>
                  </div>
                  <p className="text-sm text-foreground/60 pl-7">2 года на все работы</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="text-primary" size={20} />
                    <span className="font-semibold">Точно в срок</span>
                  </div>
                  <p className="text-sm text-foreground/60 pl-7">Договорные сроки</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" className="text-primary" size={20} />
                    <span className="font-semibold">Безопасность</span>
                  </div>
                  <p className="text-sm text-foreground/60 pl-7">Страхование объектов</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" className="text-primary" size={20} />
                    <span className="font-semibold">Прозрачность</span>
                  </div>
                  <p className="text-sm text-foreground/60 pl-7">Фиксированная смета</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-purple-600/20 to-primary/10 rounded-3xl overflow-hidden border-2 border-primary/20">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Building2" size={200} className="text-primary/20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-purple-600 rounded-3xl opacity-20 blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-purple-600 to-primary rounded-3xl opacity-20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Icon name="Star" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Отзывы клиентов</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Что говорят наши клиенты</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Нам доверяют сотни довольных клиентов по всей России
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-primary fill-primary" size={18} />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">{review.date}</Badge>
                  </div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Контакты</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Свяжитесь с нами</h2>
              <p className="text-xl text-foreground/60">
                Готовы обсудить ваш проект? Мы всегда на связи
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-xl hover:shadow-primary/10 transition-all border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-lg">Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+79991234567" className="text-lg font-semibold text-primary hover:underline">
                    +7 (999) 123-45-67
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl hover:shadow-primary/10 transition-all border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@kapitalru.ru" className="text-lg font-semibold text-primary hover:underline">
                    info@kapitalru.ru
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl hover:shadow-primary/10 transition-all border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-lg">Адрес</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    Москва, ул. Примерная, д. 1
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 bg-secondary/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="Home" className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold">KapitalRu</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#services" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Портфолио</a>
              <a href="#about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">О нас</a>
              <a href="#reviews" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Отзывы</a>
              <a href="#contacts" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Контакты</a>
            </div>
            <div className="text-sm text-foreground/60">
              © 2024 KapitalRu. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
