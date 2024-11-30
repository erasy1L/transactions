import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Transaction, TransactionCategory } from "@/entities/transaction/model";
import Input from "@/shared/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTransaction } from "@/entities/transaction/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";
import { Calendar, DollarSign, MessageSquare, Tag, User } from "lucide-react";
import { categories } from "@/shared/constants";

type FormFields = Omit<Transaction, "id">;

const schema = yup
    .object({
        dateTime: yup.date().required(),
        author: yup.string().min(2).required(),
        sum: yup.number().required(),
        category: yup
            .mixed<TransactionCategory>()
            .oneOf(["internet", "electricity", "gas"])
            .required(),
        comment: yup.string().required(),
    })
    .required();

export default function MakeTransaction() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<FormFields>({
        defaultValues: {
            dateTime: new Date(Date.now()),
            author: "",
            category: "internet",
            comment: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        addTransaction(data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <div className={styles["form-wrapper"]}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["field-wrapper"]}>
                    <User size={18} className={styles.icon} />
                    <Input
                        {...register("author")}
                        type="text"
                        placeholder="Author"
                        required
                    />
                    <p className={styles["field-error"]}>
                        {errors.author?.message}
                    </p>
                </div>
                <div className={styles["field-wrapper"]}>
                    <DollarSign size={18} className={styles.icon} />
                    <Input
                        {...register("sum")}
                        type="number"
                        placeholder="Amount"
                        required
                    />
                </div>
                <div
                    className={`${styles["datepicker-input"]}, ${styles["field-wrapper"]}`}
                >
                    <DatePicker
                        wrapperClassName={styles["datepicker-wrapper_block"]}
                        selected={getValues("dateTime")}
                        onChange={(date: Date | null) =>
                            setValue("dateTime", date!, {
                                shouldValidate: true,
                            })
                        }
                        icon={<Calendar color="#9ca3af" />}
                        calendarIconClassName={styles["datepicker-input__icon"]}
                        showIcon
                    />
                </div>
                <div className={styles["field-wrapper"]}>
                    <Tag size={18} className={styles.icon} />
                    <select {...register("category")}>
                        {categories.map((ct) => (
                            <option key={ct} value={ct.toLowerCase()}>
                                {ct}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles["field-wrapper"]}>
                    <MessageSquare size={18} className={styles.icon} />
                    <textarea
                        {...register("comment")}
                        placeholder="Comment"
                    ></textarea>
                </div>
                <button
                    className={styles["datepicker-input__submit-button"]}
                    type="submit"
                >
                    Submit Transaction
                </button>
            </form>
        </div>
    );
}
